import { NextResponse } from 'next/server';
 
export function middleware(request) {
    if(request.nextUrl.pathname.startsWith('/authentication/register') || request.nextUrl.pathname.startsWith('/authentication/login')){
        
    }
}

export const config = {
    matcher: '/authentication/:path*',
}