import classes from "./ContextMenuOption.module.css";
import { robotoMono } from "@/app/fonts.js";

export default function ContextMenuOption({ text, img }) {
    return (
        <div className={classes.optionContainer}>
            <p className={`${robotoMono.className} ${classes.optionText}`}>{text}</p>
            <img src={img} height={18} width={18} />
        </div>
    );
}