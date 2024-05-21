import classes from "./RegLogSwitch.module.css";
import Link from "next/link";
import { robotoMono } from "@/app/fonts";

/**
 * RegLogSwitch
 * Componente che contiene il link per switchare tra login e register.
 * @param switchTo stringa che indica la pagina da linkare.
 */
export default function RegLogSwitch({switchTo}) {
    let link = "";
    let text = "";
    let linkText = "";


    if(switchTo === "login"){
        link = "/authentication/login";
        text = "Already have an account?";
        linkText = "Login";
    } else {
        link = "/authentication/register";
        text = "Don't have an account yet?";
        linkText = "Register";
    }

    return (
        <div className={classes.switch}>
            <p className={`${robotoMono.className} ${classes.switchText}`}>
                {text}&nbsp;
            </p>
            <Link className={`${classes.switchLink} ${robotoMono.className}`} href={link}>{linkText}</Link>
        </div>
    );
}
;