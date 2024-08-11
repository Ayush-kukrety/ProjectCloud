import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function POST(req: NextRequest) {

    const supabase = createClient();
    
    const { name, email, aishe, degree, password, rollNo, type } = await req.json();

    if (!name || !email || !aishe || !password || (type === 'student' && (!degree || isNaN(Number(rollNo))))) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (name.length <= 3) return NextResponse.json({ error: 'Invalid Name Length' }, { status: 400 });
    if (email.length <= 3) return NextResponse.json({ error: 'Invalid Email Length' }, { status: 400 });
    if (aishe.length <= 3) return NextResponse.json({ error: 'Invalid aishe Code' }, { status: 400 });
    if (password.length <= 7) return NextResponse.json({ error: 'Password should be at least 8 characters long' }, { status: 400 });

    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    aishe,
                    degree,
                    rollNo,
                    type,
                    institutional_verification: false
                },
            },
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: type === 'student' ? 'Check your email for verification' : 'Check your email for verification\nContact Prayog for Institutional Verification' });
    } catch {
        return NextResponse.json({ error: 'Server Error. Please try again later' }, { status: 500 });
    }
}
