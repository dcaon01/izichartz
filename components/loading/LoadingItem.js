import classes from "./LoadingItem.module.css";
import LoadingCircle from "./LoadingCircle.js";
import { robotoMono } from "@/app/fonts.js";

export default function LoadingItem() {
    return (
        <div className={classes.LoadingItem}>
            <p className={robotoMono.className}>Loading...</p>
            <LoadingCircle />
        </div>
    );
}