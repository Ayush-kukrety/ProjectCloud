import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/auth/:path*',
    '/admin:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};