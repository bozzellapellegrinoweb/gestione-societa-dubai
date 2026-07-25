// Integrazione Google Calendar via OAuth2 refresh token.
// Usata per: 1) leggere le fasce occupate (freeBusy) e calcolare gli slot liberi,
//            2) creare l'evento della call con link Google Meet.
//
// Setup (una tantum) nel Google Cloud Console:
//   - Crea un OAuth Client ID (tipo "Web application")
//   - Autorizza lo scope https://www.googleapis.com/auth/calendar
//   - Ottieni un refresh_token per l'account che possiede il calendario aziendale
// Variabili d'ambiente richieste: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
//   GOOGLE_REFRESH_TOKEN, GOOGLE_CALENDAR_ID (default 'primary').

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const CAL_BASE = 'https://www.googleapis.com/calendar/v3'

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  )
}

function calendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || 'primary'
}

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google token error ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) throw new Error('Google token error: no access_token')
  return data.access_token
}

export interface BusyInterval {
  start: string // ISO
  end: string // ISO
}

/** Ritorna le fasce occupate nel calendario tra timeMin e timeMax (ISO stringhe). */
export async function getBusyIntervals(timeMin: string, timeMax: string): Promise<BusyInterval[]> {
  const token = await getAccessToken()
  const res = await fetch(`${CAL_BASE}/freeBusy`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: 'UTC',
      items: [{ id: calendarId() }],
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google freeBusy error ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: BusyInterval[] }>
  }
  const cal = data.calendars?.[calendarId()]
  return cal?.busy ?? []
}

export interface CreatedEvent {
  eventId: string
  htmlLink?: string
  meetLink?: string
}

/** Crea un evento nel calendario con un Google Meet e invita il cliente. */
export async function createCalendarEvent(params: {
  summary: string
  description?: string
  startISO: string
  endISO: string
  timeZone: string
  attendeeEmail: string
  attendeeName?: string
}): Promise<CreatedEvent> {
  const token = await getAccessToken()
  // requestId deterministico per non duplicare il Meet in caso di retry
  const requestId = `booking-${params.startISO}-${params.attendeeEmail}`.replace(/[^a-zA-Z0-9-]/g, '')

  const res = await fetch(
    `${CAL_BASE}/calendars/${encodeURIComponent(calendarId())}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: params.summary,
        description: params.description,
        start: { dateTime: params.startISO, timeZone: params.timeZone },
        end: { dateTime: params.endISO, timeZone: params.timeZone },
        attendees: [{ email: params.attendeeEmail, displayName: params.attendeeName }],
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: { useDefault: true },
      }),
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google event insert error ${res.status}: ${text.slice(0, 300)}`)
  }
  const data = (await res.json()) as {
    id: string
    htmlLink?: string
    hangoutLink?: string
    conferenceData?: { entryPoints?: { entryPointType?: string; uri?: string }[] }
  }
  const meetLink =
    data.hangoutLink ||
    data.conferenceData?.entryPoints?.find(e => e.entryPointType === 'video')?.uri

  return { eventId: data.id, htmlLink: data.htmlLink, meetLink }
}

/** Cancella un evento (usato se una prenotazione viene annullata). */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const token = await getAccessToken()
  await fetch(
    `${CAL_BASE}/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(eventId)}?sendUpdates=all`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
  )
}
