'use client';

import classes from "../../Auth.module.css";
import specClasses from "./ActivationPage.module.css";
import AuthInput from "@/components/authentication/AuthInput";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import FormButton from "@/components/utility/FormButton";
import { userAccountActivation } from "@/lib/server-actions/auth";
import { resendActivationCode } from "@/lib/server-actions/auth";
import { useFormState } from "react-dom";

export default function ActivationPage({ params }) {
    const [accActError, userAccAct] = useFormState(userAccountActivation, { messages: [] });
    const [resError, resend] = useFormState(resendActivationCode, { messages: [] });

    return (
        <>
            <h1>Activate</h1>
            <div style={{ width: 300 }}>
                {resError.messages.length > 0 && <ErrorDisplayer messages={resError.messages} />}
            </div>
            {accActError.messages.length > 0 && <ErrorDisplayer messages={accActError.messages} />}
            <p className={`${classes.header}`}>
                Insert here the code we sent to your email to activate your account.
            </p>
            <form className={classes.form} action={userAccAct}>
                <AuthInput id="activation-code" type="text" label="Code" />
                <FormButton text="Activate" pendingText="Activating..."/>
                <input style={{ display: "none" }} id="activation-slug" name="activation-slug" value={params.code} readOnly />
            </form>
            <form className={specClasses.resend} action={resend} >
                <p className={`${specClasses.resendText}`}>
                    Didn't get the code? &nbsp;
                </p>
                <button className={`${specClasses.resendButton}`} type="submit">Resend</button>
                <input style={{ display: "none" }} id="resend-activation-slug" value={params.code} readOnly />
            </form>
            {resError.messages.length > 0 && <ErrorDisplayer messages={resError.messages} />}
        </>
    );
};