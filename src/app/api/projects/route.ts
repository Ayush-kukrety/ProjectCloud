import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function GET(request: Request) {

    const supabase = createClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const aishe = searchParams.get('aishe');
    const verified = searchParams.get('verified') === 'true';
    const type = searchParams.get('type');

    if (id) {

        if(type === 'recent'){

            const { data, error } = await supabase
                .from('projects')
                .select()
                .eq('owner', id)
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) {
                return NextResponse.json({ error: error }, { status: 500 });
            }

            return NextResponse.json({ projects: data });


        }

        const { data, error } = await supabase
            .from('projects')
            .select()
            .eq('owner',id)
            .eq('verified', verified);

        if (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }

        return NextResponse.json({ data });

    }
    if (aishe) {

        const { data, error } = await supabase
            .from('projects')
            .select()
            .eq('aishe', aishe)
            .eq('verified', verified);

        if (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }

        return NextResponse.json({ data });
    }


    try {
        
        const { data, error } = await supabase
            .from('projects')
            .select()
            .eq('verified', true);

        if (error) throw new Error(error.message);

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}