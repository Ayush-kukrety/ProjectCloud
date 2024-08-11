import { createClient } from '@/utils/supabase/server';

import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const supabase = createClient();

    const { searchParams } = new URL(request.url);
    const aishe = searchParams.get('aishe');

    if (aishe) {
        const { count, error } = await supabase
            .from('workshops')
            .select('*', { count: 'exact' })
            .eq('aishe', aishe)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ count });
    }
    
}