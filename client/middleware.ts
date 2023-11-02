import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | Response {
	if (req.referrer === 'https://danijel.pro/musify') {
		console.log(req)
		console.log(NextResponse.next());
	}

	if (req.nextUrl.pathname.startsWith('/_next')) {

	}
	
	return NextResponse.next();
}
