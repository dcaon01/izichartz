'use client'

import classes from "./ContextMenu.module.css";
import { motion } from "framer-motion";

/**
 * ContextMenu
 * Componente che renderizza il pop-up menu con le varia azioni.
 * @param posX posizione X di trigger dell'elemento
 * @param posY posizione Y di trigger dell'elemento
 * @param children altre opzioni che dipendono dal modulo che andiamo ad utilizzare
 * @returns 
 */
export default function ContextMenu({ posX, posY }) {
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
            exit={{
                left: posX,
                top: posY,
                opacity: 0
            }}
        >
        </motion.div>
    );
}