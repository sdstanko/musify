import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | Response {
    console.log(req)
    return NextResponse.next();

	// const domain = 'danijel.pro'

    // const { pathname } = req.nextUrl;
	// console.log(pathname)
    // if (
    //     pathname.startsWith('/api') || //  exclude all API routes
    //     pathname.startsWith('/static') || // exclude static files
    //     pathname.includes('.') // exclude all files in the public folder
    // ) {
    //     return NextResponse.next();
    // }

	
    // const hostname = req?.headers?.get('host');
	// console.log(hostname)

    // const whitelistDomain = [domain, `www.${domain}`];

    // if (hostname && !whitelistDomain.includes(hostname)) {
    //     const subdomain = hostname?.split('.');
    //     const url = req.nextUrl.clone();

	// 	console.log(`/store/${[subdomain[0], url.pathname].join('')}`);
    //     return NextResponse.rewrite(req.nextUrl);
    //     req.nextUrl.pathname = `/store/${[subdomain[0], url.pathname].join('')}`;
    // }

}
