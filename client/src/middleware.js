import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('token');
    const isChatPath = request.nextUrl.pathname == '/chat';
    const isLoginPath = request.nextUrl.pathname === '/login';

    if (!token && isChatPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isLoginPath) {
        return NextResponse.redirect(new URL('/chat', request.url));
    }

    return NextResponse.next();
}