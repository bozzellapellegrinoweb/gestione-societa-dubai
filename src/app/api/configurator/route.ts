import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  try {
    const body = await req.json()
    const { session_data, plan_suggested, amount_aed, client_email } = body

    const { error } = await supabase.from('configurator_sessions').insert({
      session_data,
      plan_suggested,
      amount_aed,
      client_email,
      converted: false,
    })

    if (error) console.error('Supabase error:', error)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
