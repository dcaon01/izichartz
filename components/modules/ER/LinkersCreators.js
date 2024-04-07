'use client';

import classes from "./LinkersCreators.module.css";
import { useCallback } from "react";
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useDispatch } from "react-redux";
import { elementsSlice } from "@/store/design/elements-slice.js";

/**
 * LinkersCreators
 * Componente che renderizza dei cerchi quando un elemento è selezionato in modo da offrire
 * degli access point per la creazione di linkers.
 * @param width larghezza dell'svg che contiene i cerchi.
 * @param height altezza dell'svg che contiene i cerchi. 
 */
export default function LinkersCreators({ id, width, height, connecting }) {
    /* Elementi d'utility */
    const dispatch = useDispatch();
    const [scope, animate] = useAnimate();

    /**
     * handleCreation
     * Funzione che gestisce la connessione (provvisoria) di un elemento con un altro.
     * Segnala che l'elemento si vuole connettere. Il prossimo elemento clickato dovrà
     * controllare se ci sono elementi che si vogliono connettere e gestire la creazione
     * del linkers, aggiungendolo all'insieme degl elementi.
     * @param event oggetto evento triggerato onClick.
     */
    const handleCreation = useCallback((event) => {
        event.stopPropagation();
        dispatch(elementsSlice.actions.setConnectingElement(id));
    });

    /* Rendering */
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "absolute",
                height: height,
                width: width
            }}
            ref={scope}
        >
            <motion.circle
                id="right"
                r="4"
                cy={height / 2}
                fill={connecting ? "white" : "black"}
                style={{
                    stroke: "black",
                    strokeWidth: 1,
                }}
                initial={{
                    cx: width - 10,
                    opacity: 0,
                }}
                animate={{
                    cx: width - 5,
                    opacity: 1,
                }}
                className={classes.creatorHorizontal}
                onClick={handleCreation}
            />
            <motion.circle
                id="top"
                r="4"
                cx={width / 2}
                fill={connecting ? "white" : "black"}
                style={{
                    stroke: "black",
                    strokeWidth: 1,
                }}
                initial={{
                    cy: 10,
                    opacity: 0,
                }}
                animate={{
                    cy: 5,
                    opacity: 1,
                }}
                className={classes.creatorVertical}
                onClick={handleCreation}
            />
            <motion.circle
                id="left"
                r="4"
                cy={height / 2}
                fill={connecting ? "white" : "black"}
                style={{
                    stroke: "black",
                    strokeWidth: 1,
                }}
                initial={{
                    cx: 10,
                    opacity: 0,
                }}
                animate={{
                    cx: 5,
                    opacity: 1,
                }}
                className={classes.creatorHorizontal}
                onClick={handleCreation}
            />
            <motion.circle
                id="bottom"
                r="4"
                cx={width / 2}
                fill={connecting ? "white" : "black"}
                style={{
                    stroke: "black",
                    strokeWidth: 1,
                }}
                initial={{
                    cy: height - 10,
                    opacity: 0,
                }}
                animate={{
                    cy: height - 5,
                    opacity: 1,
                }}
                className={classes.creatorVertical}
                onClick={handleCreation}
            />
        </svg>
    );
};