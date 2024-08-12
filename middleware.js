import { NextResponse } from 'next/server';

/**
 * middleware
 * Funzione che viene eseguita prima della risposta del server a qualsiasi richiesta.
 * @param request richiesta dal client.
 */
export async function middleware(request) {
    const path = request.nextUrl.pathname;

    if (path.startsWith('/workspace')) {
        const sid = request.cookies.get("sid");
        console.log(sid);
        if (sid) {
            // fetchamo l'api routes per la verifica della sessione
            const data = await callVerifySession(sid, request);
            console.log(data);
            if (data.isSessionValid) {
                if (data.verifSlug) {
                    return NextResponse.redirect(new URL(`/authentication/activation/${data.verifSlug}`, request.url));
                } else {
                    let response = NextResponse.next();
                    const date = new Date(Date.now() + 43200000);
                    response.cookies.set({
                        name: 'sid',
                        value: sid.value,
                        expires: date
                    });
                    const value = JSON.parse(sid.value);
                    if (path !== `/workspace/${value.username}`) {
                        return NextResponse.redirect(new URL(`/workspace/${value.username}`, request.url));
                    } else {
                        return response;
                    }
                }
            } else {
                // Eliminare il cookie
                request.cookies.delete('sid');
                return NextResponse.redirect(new URL('/authentication/login', request.url));
            }
        } else {
            return NextResponse.redirect(new URL('/authentication/login', request.url));
        }
    }

    if (path.startsWith('/authentication/register') || path.startsWith('/authentication/login')) {
        const sid = request.cookies.get("sid");
        if (sid) {
            const data = await callVerifySession(sid, request);
            if (data.isSessionValid) {
                if (data.verifSlug) {
                    return NextResponse.redirect(new URL(`/authentication/activation/${data.verifSlug}`, request.url));
                } else {
                    return NextResponse.redirect(new URL(`/workspace/${sid.value.username}`, request.url));
                }
            } else {
                return NextResponse.next();
            }
        } else {
            return NextResponse.next();
        }
    }

    if (path.startsWith('/authentication/activation')) {
        const sid = request.cookies.get("sid");
        console.log(sid);
        if (sid) {
            console.log("Trovato il cookie");
            const data = await callVerifySession(sid, request);
            console.log(data);
            if (data.isSessionValid) {
                if (!data.verifSlug) {
                    return NextResponse.redirect(new URL(`/workspace/${sid.value.username}`, request.url));
                }
            } else {
                return NextResponse.redirect(new URL('/authentication/login', request.url));
            }
        } else {
            return NextResponse.redirect(new URL('/authentication/login', request.url));
        }
    }
    return NextResponse.next();
}

/**
 * callVerifySession
 * Funzione che si occupa di richiamare il route handler verifySession e di
 * prelevare i risultati
 * @returns Response sotto forma di JSON con le informazioni necessarie per 
 * un giusto reindirizzamento
 */
async function callVerifySession(sid, request) {
    const resp = await fetch(new URL('/api/auth/verifySession', request.url), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sid })
    });
    const response = await resp.json();
    return response;
}