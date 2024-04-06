'use client';

import classes from "./LinkersCreators.module.css";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion } from 'framer-motion';


/**
 * LinkersCreators
 * Componente che renderizza dei cerchi quando un elemento è selezionato in modo da offrire
 * degli access point per la creazione di linkers.
 * @param width larghezza dell'svg che contiene i cerchi.
 * @param height altezza dell'svg che contiene i cerchi. 
 */
export default function LinkersCreators({ width, height, functs }) {
    /* Elementi di utility */
    let [grabbing, setGrabbing] = useState(false);
    
    /* Refs */
    let creatorsRef = useRef();

    /* Ci possono essere 2 opzioni e dobbiamo verificarle entrambe
    - Creare una funzione handler per il mouseDown sui circle che richiama un'altra funzione in entity in modo che possa gestire
    la creazione di un svg temporaneo all'interno del workpane che permetta di disegnare una linea per collegare due elementi.
    La propagazione dell'evento potrebbe essere un dito nel culo ma ER è l'unico componente a possedere le informazioni su tutti i componenti
    e poter gestire la logica di aggancio dei linkers. Potremmo renderizzare un svg momentaneo grande tutto il workpane in ER, all'interno del workpane
    e fare in modo di disegnare la linea. 
    - In alternativa si potremme pensare di disegnare direttamente sul linker creator ma non abbiamo info sui componenti.
    */
    const handleCreation = useCallback((event) => {
        event.stopPropagation();
        let rect = creatorsRef.current.getBoundingClientRect();
        functs[0](event, rect.x, rect.y);
    })

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "absolute",
                height: height,
                width: width
            }}
        >
            <motion.circle
                id="right"
                r="4"
                cy={height / 2}
                fill="black"
                initial={{
                    cx: width - 10,
                    opacity: 0,
                }}
                animate={{
                    cx: width - 5,
                    opacity: 1,
                }}
                className={classes.creatorHorizontal}
                ref={creatorsRef}
                onMouseDown={handleCreation}
            />
            <motion.circle
                id="top"
                r="4"
                cx={width / 2}
                fill="black"
                initial={{
                    cy: 10,
                    opacity: 0,
                }}
                animate={{
                    cy: 5,
                    opacity: 1,
                }}
                className={classes.creatorVertical}
                ref={creatorsRef}
                onMouseDown={handleCreation}
            />
            <motion.circle
                id="left"
                r="4"
                cy={height / 2}
                fill="black"
                initial={{
                    cx: 10,
                    opacity: 0,
                }}
                animate={{
                    cx: 5,
                    opacity: 1,
                }}
                className={classes.creatorHorizontal}
                ref={creatorsRef}
                onMouseDown={handleCreation}
            />
            <motion.circle
                id="bottom"
                r="4"
                cx={width / 2}
                fill="black"
                initial={{
                    cy: height - 10,
                    opacity: 0,
                }}
                animate={{
                    cy: height - 5,
                    opacity: 1,
                }}
                className={classes.creatorVertical}
                ref={creatorsRef}
                onMouseDown={handleCreation}
            />
        </svg>
    );
};