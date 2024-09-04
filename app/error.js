'use client'

import Link from "next/link";

/**
 * Error Page
 * Pagina che viene fuori ogni volta che c'è un errore.
 * Riusciamo così a gestire tutti quelli errori che possono
 * essere risolti da soli da middleware.
 */
export default function ErrorPage() {
    return (
        <body>
            <main>
                <div>
                    <p>Oops... Something strange happened..</p>
                    <Link href="/">Go back Home</Link>
                </div>
            </main>
        </body>
    );
}

