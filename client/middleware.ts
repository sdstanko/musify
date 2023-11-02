import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | Response {
	if (req.referrer === 'https://danijel.pro/musify') {
		console.log(req)
	}

	if (req.nextUrl.pathname.startsWith('/_next')) {
		return
	}
	
	return NextResponse.next();
}
