import classes from "./LoadingItem.module.css";
import LoadingCircle from "./LoadingCircle.js";
import { robotoMono } from "@/app/fonts.js";

export default function LoadingItem({ text }) {
    return (
        <div className={classes.LoadingItem}>
            <LoadingCircle />
            <p className={robotoMono.className}>{text}</p>
        </div>
    );
}