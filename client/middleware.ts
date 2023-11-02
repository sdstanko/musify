import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | Response {
	if (req.headers.get('referer') === 'https://danijel.pro/musify') {
	}
	console.log(req)
	console.log(NextResponse.next());

	if (req.nextUrl.pathname.startsWith('/_next/data')) {

	}
	
	return NextResponse.next();
}
