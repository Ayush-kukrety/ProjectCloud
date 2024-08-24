// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function POST(req: NextRequest) {

  const supabase = createClient();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const { type, institutional_verification } = data.user.user_metadata || {};

  if (type === 'institute' && !institutional_verification) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: 'Institutional Verification is pending. Contact Project Cloud Support' }, { status: 403 });
  }

  return NextResponse.json({ user: data.user });
}
