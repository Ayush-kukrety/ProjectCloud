import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
 // Adjust the path as needed

export async function GET(request: Request) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);

    const aishe = searchParams.get('aishe');
    const type = searchParams.get('type')

    if (aishe) {

        if (type === 'recent') {
            const { data, error } = await supabase
                .from('workshops')
                .select()
                .eq('aishe', aishe)
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) {
                return NextResponse.json({ error: error }, { status: 500 });
            }

            return NextResponse.json({ workshops: data });
        }

    }

    const { data, error } = await supabase
        .from('workshops')
        .select();

    if (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
    return NextResponse.json({ workshops: data });

}