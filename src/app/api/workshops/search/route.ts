// route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') || '';

  try {
    const { data, error } = await supabase
      .from('workshops')
      .select();

    if (error) throw error;

    const filteredWorkshops = data?.filter(workshop =>
      workshop.title.toLowerCase().includes(keyword.toLowerCase()) ||
      workshop.description.toLowerCase().includes(keyword.toLowerCase())
    ) || [];

    return NextResponse.json({ filteredWorkshops });
  } catch (error) {
    return NextResponse.error();
  }
}
