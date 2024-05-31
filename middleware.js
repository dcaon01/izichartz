import { NextResponse } from 'next/server';

/* Appunti 
Per fare in modo che se un utente è stato renderizzato in activation, e lui naviga via
dalla pagina perché è coglione, si potrebbe pensare ad implementare una pre-sessione (nella colonna data di SESSIONS), in modo
da riuscire, com middleware, a renderizzare l'utente alla pagina giusta, risalendo allo slug. Oppure mettiamo solo il pulsant activate account.
e al codice relativo. Non serve per ora implementare un controllo sullo slug e sul tipo di verifica, perché l'utente non può aver
fatto nient'altro prima di essersi registrato.
*/
 
export function middleware(request) {
    /*
    if(request.nextUrl.pathname.startsWith('/authentication/register') || request.nextUrl.pathname.startsWith('/authentication/login')){
        
    }*/
}

/*
export const config = {
    matcher: '/authentication/:path*',
}*/