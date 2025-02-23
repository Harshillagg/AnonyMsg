import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export { default } from 'next-auth/middleware' // auth for entire website now 

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request })
  const url = request.nextUrl

  if (token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  if(token && (url.pathname.startsWith('/sign-in') || 
                url.pathname.startsWith('/sign-up') || 
                url.pathname.startsWith('/verify')) ){
      return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()  
}

// config contains the URL paths this middleware should apply to 
export const config = {
  matcher: [ 
        '/sign-in',
        '/sign-up',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}