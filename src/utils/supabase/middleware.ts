import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Define your protected and public-only routes
const protectedRoutes = ['/profile/*']
const publicOnlyRoutes = ['/auth/*']
const adminOnlyRoutes = ['/admin/*']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname

  // Helper function to check if a path matches a route pattern
  const matchesRoute = (path: string, routePattern: string) => {
    const baseRoute = routePattern.replace('/*', '')
    return path === baseRoute || path.startsWith(`${baseRoute}/`)
  }

  // If user is not authenticated and tries to access a protected route
  if (!user && protectedRoutes.some(route => matchesRoute(path, route))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If user is authenticated and tries to access a public-only route
  if (user && publicOnlyRoutes.some(route => matchesRoute(path, route))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if(!user?.app_metadata.claims_admin && adminOnlyRoutes.some(route => matchesRoute(path, route))){
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse;
}