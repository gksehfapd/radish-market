import { NextFetchEvent, NextRequest, NextResponse, userAgent } from 'next/server'
export function middleware(req: NextRequest, ev: NextFetchEvent) {
	const ua = userAgent(req)
	if (ua.isBot) {
		return new NextResponse("plz don't be a bot. Be human,", {
			status: 403
		})
	}

	if (!req.url.includes('/enter') && !req.cookies.has('carrotsession')) {
		return NextResponse.redirect(new URL('/enter', req.url))
	}
}
