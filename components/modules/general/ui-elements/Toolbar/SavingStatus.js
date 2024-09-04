import classes from "./SavingStatus.module.css";
import { robotoMono } from "@/app/fonts";

/**
 * SavingStatus
 * Componente che segnala all'utente che c'è 
 */
export default function SavingStatus() {
    return (
        <div className={classes.savingStatus}>
            <p className={`${robotoMono.className} ${classes.savingText}`}>Saved&nbsp;</p>
            <img className={classes.savingImage} src="/assets/global/verification-on-cloud.png" width={22} height={22}/>
        </div>
    );
}

