'use client'

import classes from "./ContextMenu.module.css";
import { motion } from "framer-motion";
import ContextMenuOption from "./ContextMenuOption";

/**
 * ContextMenu
 * Componente che renderizza il pop-up menu con le varia azioni.
 * @param posX posizione X di trigger dell'elemento
 * @param posY posizione Y di trigger dell'elemento
 * @param children altre opzioni che dipendono dal modulo che andiamo ad utilizzare
 * @returns 
 */
export default function ContextMenu({children, posX, posY }) {
    return (
        <motion.div
            className={classes.contextMenuContainer}
            initial={{
                left: posX,
                top: posY,
                opacity: 0
            }}
            animate={{
                left: posX,
                top: posY,
                opacity: 1
            }}
        >
            <ContextMenuOption text="Copy" img="/assets/design/copy.png" />
            <ContextMenuOption text="Cut" img="/assets/design/cut.png" />
            <ContextMenuOption text="Paste" img="/assets/design/paste.png" />
            <hr className={classes.contextLine}/>
            {children}
        </motion.div>
    );
}