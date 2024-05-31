'use client';

import classes from "../Auth.module.css";
import RegLogSwitch from "@/components/authentication/RegLogSwitch";
import { robotoMono } from "@/app/fonts";
import { useFormState } from "react-dom";
import { userRegister } from "@/lib/server-actions/auth.js";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import AuthInput from "@/components/authentication/AuthInput.js";

/**
 * RegisterPage
 * Pagina di registrazione dell'utente
 * @refactor    - Creare un componente per gli input normali e le password, ma capire se funziona con il form.
 */
export default function RegisterPage() {
    let [state, formAction] = useFormState(userRegister, { messages: [] });

    /* Rendering */
    return (
        <>
            <h1 className={`${robotoMono.className}`}>Register</h1>
            {state.messages.length > 0 && <ErrorDisplayer messages={state.messages} />}
            <form className={classes.form} action={formAction} noValidate>
                <AuthInput id="register-username" type="text" label="Username"/>
                <AuthInput id="register-email" type="email" label="Email"/>
                <AuthInput id="register-password" type="password" label="Password"/>
                <AuthInput id="register-confirm-password" type="password" label="Confirm Password"/>
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Register</button>
            </form>
            <RegLogSwitch switchTo={"login"}/>
        </>
    );
}