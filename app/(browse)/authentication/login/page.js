'use client';

import classes from "../Auth.module.css";
import RegLogSwitch from "@/components/authentication/RegLogSwitch";
import AuthInput from "@/components/authentication/AuthInput";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import { robotoMono } from "@/app/fonts";
import { useFormState } from "react-dom";
import { userLogin } from "@/lib/server-actions/auth";

// Disattivare il pulsante durante l'invio del form con useFormStatus e pending
export default function LoginPage() {
    let [state, formAction] = useFormState(userLogin, { messages: [] });

    return (
        <>
            <h1 className={`${robotoMono.className}`}>Login</h1>
            {state.messages.length > 0 && <ErrorDisplayer messages={state.messages} />}
            <form className={classes.form} action={formAction}>
                <AuthInput id="login-user" type="text" label="Email or Username" />
                <AuthInput id="login-password" type="password" label="Password" />
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Login</button>
            </form>
            <RegLogSwitch switchTo={"register"} />
        </>
    );
}