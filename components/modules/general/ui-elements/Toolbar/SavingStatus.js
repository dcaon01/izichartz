import classes from "./SavingStatus.module.css";
import { robotoMono } from "@/app/fonts";
import LoadingCircle from "@/components/loading/LoadingCircle";
import { AnimatePresence } from "framer-motion";
import SavingErrorDropdown from "./SavingErrorDropdown";

/**
 * SavingStatus
 * Componente che segnala all'utente che c'è 
 */
export default function SavingStatus({ status }) {
    let statusText = "";
    switch (status) {
        case "saved":
            statusText = "Saved";
            break;
        case "saving":
            statusText = "Saving...";
            break;
        case "notsaved":
            statusText = "Not Saved";
            break;
    }

    return (
        <div className={classes.savingStatus}>
            <p className={`${robotoMono.className} ${classes.savingText}`}>{statusText}&nbsp;</p>
            {statusText === "Saved" && <img className={classes.savingImage} src="/assets/global/verification-on-cloud.png" width={22} height={22} />}
            {statusText === "Saving..." && <LoadingCircle size={22} />}
            {statusText === "Not Saved" &&
                <>
                    <img className={classes.savingImage} src="/assets/global/error-on-cloud.png" width={22} height={22} />
                    <AnimatePresence>
                       <SavingErrorDropdown />
                    </AnimatePresence>
                </>
            }
        </div>
    );
}

