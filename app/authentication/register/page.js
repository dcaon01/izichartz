'use client';

import classes from "../Auth.module.css";
import RegLogSwitch from "@/components/authentication/RegLogSwitch";
import { robotoMono } from "@/app/fonts";
import { useState } from "react";
import { useFormState } from "react-dom";
import { userRegister } from "@/lib/server_actions/auth.js";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";

/**
 * RegisterPage
 * Pagina di registrazione dell'utente
 * @refactor    - Creare un componente per gli input normali e le password, ma capire se funziona con il form.
 *              - Creare un componente per la scritta in basso.
 *              - Creare un componente per il display dell'errore.
 */
export default function RegisterPage() {
    let [state, formAction] = useFormState(userRegister, { messages: [] });
    let [isVisible1, setIsVisible1] = useState(false);
    let [isVisible2, setIsVisible2] = useState(false);

    /**
     * handlePswVisible1
     * funzione per la gestione della prima password.
     * @param event evento onClick.
     */
    function handlePswVisible1(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isVisible1) {
            setIsVisible1(false);
        } else {
            setIsVisible1(true);
        }
    }

    /**
     * handlePswVisible1
     * funzione per la gestione della seconda password.
     * @param event evento onClick.
     */
    function handlePswVisible2(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isVisible2) {
            setIsVisible2(false);
        } else {
            setIsVisible2(true);
        }
    }

    /* Rendering */
    return (
        <>
            <h1 className={`${robotoMono.className}`}>Register</h1>
            {state.messages.length > 0 && <ErrorDisplayer messages={state.messages} />}
            <form className={classes.form} action={formAction} noValidate>
                <div className={classes.inputWrapper}>
                    <label className={`${robotoMono.className}`}>Username</label>
                    <input className={`${robotoMono.className} ${classes.input}`} type="text" id="register-username" name="register-username" required />
                </div>
                <div className={classes.inputWrapper}>
                    <label className={`${robotoMono.className}`}>Email</label>
                    <input className={`${robotoMono.className} ${classes.input}`} type="email" id="register-email" name="register-email" required />
                </div>
                <div className={classes.inputWrapper}>
                    <div className={classes.passwordHead}>
                        <label className={`${robotoMono.className}`}>Password</label>
                        <div className={classes.visible} onClick={handlePswVisible1} >
                            <img src={isVisible1 ? "/assets/global/visible.png" : "/assets/global/not_visible.png"} height={16} width={16} alt={isVisible2 ? "hide" : "show"} />
                        </div>
                    </div>
                    <input
                        className={`${classes.input} ${robotoMono.className}`}
                        type={isVisible1 ? "text" : "password"}
                        id="register-password"
                        name="register-password"
                        required
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <div className={classes.passwordHead}>
                        <label className={`${robotoMono.className}`}>Confirm Password</label>
                        <div className={classes.visible} onClick={handlePswVisible2}>
                            <img src={isVisible2 ? "/assets/global/visible.png" : "/assets/global/not_visible.png"} height={16} width={16} alt={isVisible2 ? "hide" : "show"} />
                        </div>
                    </div>
                    <input
                        className={`${classes.input} ${robotoMono.className}`}
                        type={isVisible2 ? "text" : "password"}
                        id="register-confirm-password"
                        name="register-confirm-password"
                        required
                    />
                </div>
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Register</button>
            </form>
            <RegLogSwitch switchTo={"login"}/>
        </>
    );
}