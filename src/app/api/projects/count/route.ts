import { createClient } from '@/utils/supabase/server';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const aishe = searchParams.get('aishe');
    const id = searchParams.get('id');

    if (aishe) {
        const { count, error } = await supabase
            .from('projects')
            .select('*', { count: 'exact' })
            .eq('aishe', aishe)
            .eq('verified', true);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ count });
    }
    if (id) {
        const { count, error } = await supabase
            .from('projects')
            .select('*', { count: 'exact' })
            .eq('owner', id)
            .eq('verified', true);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ count });
    }
    return NextResponse.json({ error: 'Owner ID is required' }, { status: 400 });

}