'use client';

import classes from "../../Auth.module.css";
import specClasses from "./ActivationPage.module.css";
import AuthInput from "@/components/authentication/AuthInput";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import { userAccountActivation } from "@/lib/server-actions/auth";
import { resendActivationCode } from "@/lib/server-actions/auth";
import { robotoMono } from "@/app/fonts";
import { useFormState } from "react-dom";

export default function ActivationPage({ params }) {
    const [accActError, userAccAct] = useFormState(userAccountActivation, { messages: [] });
    const [resError, resend] = useFormState(resendActivationCode, { messages: [] });
    
    return (
        <>
            <h1 className={`${robotoMono.className}`}>Activate</h1>
            {accActError.messages.length > 0 && <ErrorDisplayer messages={accActError.messages} />}
            <p className={`${robotoMono.className} ${classes.header}`}>
                Insert here the code we sent to your email to activate your account.
            </p>
            <form className={classes.form} action={userAccAct}>
                <AuthInput id="activation-code" type="text" label="Code" />
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Activate</button>
                <input style={{ display: "none" }} id="activation-slug" name="activation-slug" value={params.code} readOnly />
            </form>
            <form className={specClasses.resend} action={resend} >
                <p className={`${robotoMono.className} ${specClasses.resendText}`}>
                    Didn't get the code? &nbsp;
                </p>
                <button className={`${specClasses.resendButton} ${robotoMono.className}`} type="submit">Resend</button>
                <input style={{ display: "none" }} id="resend-activation-slug" value={params.code} readOnly />
            </form>
            {resError.messages.length > 0 && <ErrorDisplayer messages={resError.messages} />}
        </>
    );
};