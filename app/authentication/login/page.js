import classes from "../Auth.module.css";
import RegLogSwitch from "@/components/authentication/RegLogSwitch";
import AuthInput from "@/components/authentication/AuthInput";
import { robotoMono } from "@/app/fonts";

export default function LoginPage() {
    return (
        <>
            <h1 className={`${robotoMono.className}`}>Login</h1>
            <form className={classes.form}>
                <AuthInput id="login-user" type="text" label="Email or Username"/>
                <AuthInput id="login-password" type="password" label="Password"/>
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Login</button>
            </form>
            <RegLogSwitch switchTo={"register"}/>
        </>
    );
}