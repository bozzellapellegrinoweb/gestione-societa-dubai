import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { contract_id, files, software, notes } = await req.json()

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )

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

      await supabase.from('contracts').update({
        status: 'onboarding_complete',
      }).eq('id', contract_id)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
