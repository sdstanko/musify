import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | Response {
	console.log(req)
	console.log(NextResponse.next());
	if (req.referrer === 'https://danijel.pro/musify') {
	}

	if (req.nextUrl.pathname.startsWith('/_next')) {

	}
	
	return NextResponse.next();
}
