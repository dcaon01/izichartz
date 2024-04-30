import classes from "../Auth.module.css";
import Link from "next/link";
import { robotoMono } from "@/app/fonts";

export default function RegisterPage() {
    return (
        <>
            <h1 className={`${robotoMono.className}`}>Register</h1>
            <form className={classes.form}>
                <div className={classes.inputWrapper}>
                    <label className={`${robotoMono.className}`}>Email</label>
                    <input className={`${robotoMono.className} ${classes.input}`} type="email" id="register-email" name="register-email" required />
                </div>
                <div className={classes.inputWrapper}>
                    <label className={`${robotoMono.className}`}>Password</label>
                    <input
                        className={`${classes.input}`}
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Register</button>
            </form>
            <div className={classes.account}>
                <p className={`${robotoMono.className} ${classes.already}`}>
                    Already have an account?&nbsp;
                </p>
                <Link className={`${classes.toLogin} ${robotoMono.className}`} href="/authentication/login">Login</Link>
            </div>
        </>
    );
}