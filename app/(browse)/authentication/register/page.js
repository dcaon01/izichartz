'use client';

import classes from "../Auth.module.css";
import RegLogSwitch from "@/components/authentication/RegLogSwitch";
import { useFormState } from "react-dom";
import { userRegister } from "@/lib/server-actions/auth.js";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import AuthInput from "@/components/authentication/AuthInput.js";
import FormButton from "@/components/utility/FormButton";

/**
 * RegisterPage
 * Pagina di registrazione dell'utente
 */
export default function RegisterPage() {
    let [state, formAction] = useFormState(userRegister, { messages: [] });

    /* Rendering */
    return (
        <>
            <h1>Register</h1>
            <div style={{ width: 300 }}>
                {state.messages.length > 0 && <ErrorDisplayer messages={state.messages} />}
            </div>
            <form className={classes.form} action={formAction} noValidate>
                <AuthInput id="register-username" type="text" label="Username" />
                <AuthInput id="register-email" type="email" label="Email" />
                <AuthInput id="register-password" type="password" label="Password" />
                <AuthInput id="register-confirm-password" type="password" label="Confirm Password" />
                <FormButton text="Register" pendingText="Registering..."/>
            </form>
            <RegLogSwitch switchTo={"login"} />
        </>
    );
}