'use client'

import Link from "next/link";
import { robotoMono } from "./fonts";
import classes from "./error.module.css";

/**
 * Error Page
 * Pagina che viene fuori ogni volta che c'è un errore.
 * Riusciamo così a gestire tutti quelli errori che possono
 * essere risolti da soli da middleware.
 */
export default function ErrorPage() {
    return (
        <html lang="en">
            <body>
                <main>
                    <div className={`${robotoMono.className} ${classes.errorContainer}`}>
                        <img src="/assets/global/logo.png" style={{ height: "30px", width: "auto" }} />
                        <p className={classes.errorText}>ERROR</p>
                        <p>Oops... Something strange happened...</p>
                        <Link href="/" className={classes.errorLink}>Go back Home</Link>
                    </div>
                </main>
            </body>
        </html>
    );
}

