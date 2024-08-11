import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    const supabase = createClient();

    const formData = await req.formData();
    const workshop_id = formData.get('workshop_id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;
    const author = formData.get('author') as string;
    const aishe = formData.get('aishe') as string;
    const cover = formData.get('cover') as File;

    if (!workshop_id || !title || !description || !cover) {
        return NextResponse.json({ error: 'Workshop ID, title, description, and cover image are required' }, { status: 400 });
    }

    try {
        let coverPath = '';

        // Upload cover image
        if (cover) {
            const fileExtension = cover.name.split('.').pop();
            const filePath = `${workshop_id}/cover.${fileExtension}`;

            const { error: uploadError } = await supabase
                .storage
                .from('workshops')
                .upload(filePath, cover, {
                    contentType: cover.type,
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;
            coverPath = filePath;
        }

        // Save workshop details to your database
        const { error } = await supabase
            .from('workshops')
            .insert({
                workshop_id,
                title,
                author,
                aishe,
                description,
                cover: coverPath,
                link
            });

        if (error) throw error;

        return NextResponse.json({ message: 'Workshop submitted successfully!', workshopId: workshop_id }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while submitting the workshop' }, { status: 500 });
    }
}