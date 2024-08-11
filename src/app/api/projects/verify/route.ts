import { createClient } from '@/utils/supabase/server';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { data, error } = await supabase
        .from('projects')
        .update({ verified: true })
        .eq('project_id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}