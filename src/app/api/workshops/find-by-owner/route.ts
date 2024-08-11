import { createClient } from '@/utils/supabase/server';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Owner ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('workshops')
        .select()
        .eq('owner', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}
