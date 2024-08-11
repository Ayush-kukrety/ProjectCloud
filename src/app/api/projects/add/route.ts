// app/api/projects/add/route.ts

import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';


export async function POST(request: NextRequest) {

  const supabase = createClient();

  try {
    const formData = await request.formData();
    const projectId = formData.get('projectId') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const markdown = formData.get('markdown') as string;
    const owner = formData.get('owner') as string;
    const author = formData.get('author') as string;
    const aishe = formData.get('aishe') as string;
    const cover = formData.get('cover') as File;

    // Handle file uploads
    const uploadProjectFile = async (file: File, fileIndex: number, fileType: 'cover' | 'image' | 'document'): Promise<string> => {
      const fileExtension = file.name.split('.').pop();
      let fileName: string;

      if (fileType === 'cover') {
        fileName = `cover.${fileExtension}`;
      } else if (fileType === 'image') {
        fileName = `img${fileIndex}.${fileExtension}`;
      } else {
        fileName = `doc${fileIndex}.${fileExtension}`;
      }

      const filePath = `${projectId}/${fileType === 'cover' ? '' : fileType === 'image' ? 'images' : 'docs'}/${fileName}`;

      const { data, error } = await supabase
        .storage
        .from('projects')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;
      return filePath;
    };

    // Upload cover
    const coverPath = await uploadProjectFile(cover, 0, 'cover');

    // Upload images
    const imagePaths: string[] = [];
    for (let i = 0; formData.get(`image${i}`); i++) {
      const image = formData.get(`image${i}`) as File;
      const imagePath = await uploadProjectFile(image, i + 1, 'image');
      imagePaths.push(imagePath);
    }

    // Upload documents
    const documentPaths: string[] = [];
    for (let i = 0; formData.get(`document${i}`); i++) {
      const document = formData.get(`document${i}`) as File;
      const documentPath = await uploadProjectFile(document, i + 1, 'document');
      documentPaths.push(documentPath);
    }

    // Save project details to database
    const { error } = await supabase
      .from('projects')
      .insert({
        project_id: projectId,
        title,
        owner,
        author,
        aishe,
        description,
        markdown,
        cover: coverPath,
        images: imagePaths,
        documents: documentPaths
      });

    if (error) throw error;

    return NextResponse.json({ message: "Project submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "An error occurred while submitting the project" }, { status: 500 });
  }
}