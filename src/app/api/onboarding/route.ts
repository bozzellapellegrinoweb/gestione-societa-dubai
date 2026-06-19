import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { contract_id, files, software, notes } = await req.json()

    // Inserisci record documenti
    if (files && files.length > 0) {
      const docRecords = files.map((f: { key: string; name: string }) => ({
        contract_id,
        name: f.name,
        storage_path: `contracts/${contract_id}/${f.key}/${f.name}`,
        uploaded_by: 'client',
        doc_type: f.key,
      }))
      await supabase.from('documents').insert(docRecords)
    }

    // Salva note aggiuntive nel contratto
    await supabase.from('contracts').update({
      status: 'onboarding_complete',
    }).eq('id', contract_id)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
