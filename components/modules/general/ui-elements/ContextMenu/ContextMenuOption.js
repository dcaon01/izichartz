import classes from "./ContextMenuOption.module.css";
import { robotoMono } from "@/app/fonts.js";

/**
 * ContextMenuOption
 * Componente che renderizza un'opzione del Context menu.
 * @param text testo da mostrare.
 * @param img icona da mostrare.
 * @param onClick funzione da performare una volta cliccato.
 */
export default function ContextMenuOption({ text, img, onClick }) {
    return (
        <div className={classes.optionContainer} onClick={onClick}>
            <p className={`${robotoMono.className} ${classes.optionText}`}>{text}</p>
            <img src={img} height={18} width={18} />
        </div>
    );
}