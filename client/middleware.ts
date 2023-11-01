import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | Response {
    console.log(req)

    return NextResponse.next();
}
