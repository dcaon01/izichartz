'use client';

import classes from "../Auth.module.css";
import RegLogSwitch from "@/components/authentication/RegLogSwitch";
import AuthInput from "@/components/authentication/AuthInput";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import FormButton from "@/components/utility/FormButton";
import { useFormState } from "react-dom";
import { userLogin } from "@/lib/server-actions/auth";

export default function LoginPage() {
    let [state, formAction] = useFormState(userLogin, { messages: [] });

    return (
        <>
            <h1>Login</h1>
            <div style={{ width: 300 }}>
                {state.messages.length > 0 && <ErrorDisplayer messages={state.messages} />}
            </div>
            <form className={classes.form} action={formAction} noValidate>
                <AuthInput id="login-user" type="text" label="Email or Username" />
                <AuthInput id="login-password" type="password" label="Password" />
                <FormButton text="Login" pendingText="Logging in..."/>
            </form>
            <RegLogSwitch switchTo={"register"} />
        </>
    );
}