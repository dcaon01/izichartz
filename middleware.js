import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/dist/server/api-utils';

/**
 * middleware
 * Funzione che viene eseguita prima della risposta del server a qualsiasi richiesta.
 * @param request richiesta dal client.
 */
export function middleware(request) {
    let sid = cookies().get("sid");
    let sState = cookies().get("sState");
    if (!sid) {
        // Dobbiamo proteggere le route non accedibili da un utente non connesso. e settare il cookie sState a false.
        if (sState && sState.value) {
            console.log(request.nextUrl);
            revalidatePath(request.nextUrl);
        } 
        if (request.nextUrl.pathname.startsWith('/workspace')) {
            redirect("/login");
        }
    } else {
        if (sState && !sState) {
            revalidatePath(request.nextUrl);
        }
        // Dobbiamo proteggere le route di login, register e attivazione che non devono essere accedibili.
        if (request.nextUrl.pathname.startsWith('/authentication')) {
            redirect()
        }
    }
    NextResponse.next()
}

/*
export const config = {
    matcher: '/authentication/:path*',
}*/