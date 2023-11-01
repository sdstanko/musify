import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const path = request.url.split('musify')[1];
    return NextResponse.redirect(new URL(path, request.url));
}

export const config = {
    matcher: '/musify/:path*',
};
