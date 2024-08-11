import { createClient } from '@/utils/supabase/server'; // Adjust the path as needed
import { NextResponse } from 'next/server';

interface Project {
    created_at: string;
    description: string;
    id: number;
    project_id: string;
    title: string;
    cover: string;
    verified: boolean;
}

export async function GET(request: Request) {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

    try {
        if (!keyword) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        const { data, error } = await supabase
            .from('projects')
            .select()
            .eq('verified', true);

        if (error) throw new Error(error.message);

        const filtered = data.filter((project: Project) =>
            project.title.toLowerCase().includes(keyword.toLowerCase()) ||
            project.description.toLowerCase().includes(keyword.toLowerCase())
        );

        return NextResponse.json({ data: filtered }, { status: 200 });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
