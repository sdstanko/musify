import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.href === 'http://localhost:3000/album/653768818eb22bc7bf309fbc') {
        // console.log(request.nextUrl.searchParams.entries()); 
    }
    // return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/about/:path*',
// };
