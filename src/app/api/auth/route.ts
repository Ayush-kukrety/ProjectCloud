// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function GET() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return NextResponse.json({ authenticated: false });
    }
    return NextResponse.json({
      authenticated: true,
      user: data.user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
