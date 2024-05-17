import { robotoMono } from "@/app/fonts";
import classes from "./ErrorDisplayer.module.css";

/**
 * Componente utilizzato nella sezione autenticazione per mostrare gli errori
 * di inserimento. 
 * @param messages array di messaggi di errore da mostrare all'utente. 
 * @returns 
 */
export default function ErrorDisplayer({ messages }) {
    let count = 0;

    let content = messages.map((message) => {
        count++;
        return (
            <p className={`${robotoMono.className} ${classes.errorText}`} key={"error-message-"+count}>
                {message}
            </p>
        );
    });

    /* Render */
    return (
        <div className={classes.errorContainer}>
            {content}
        </div>
    );
}