'use client';

import { useDispatch } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { elementsSlice } from "@/store/design/elements-slice";
import { motion } from 'framer-motion';

/**
 * Entity
 * Componente che renderizza un'entità del modello ER.
 * @param id indice e identificatore dell'elemento all'interno dell'array degli elementi.
 * @param options opzioni utili al rendering dell'elemento.
 * @param selected flag di selezione dell'elemento.
 */
export const Entity = memo(function Entity({ id, options, selected }) {
    /* Prelevamento delle opzioni utili */
    let text = options.text; // Testo interno al rettangolo.
    let position = options.position; // Oggetto posizione.
    let connecting = options.connecting // Gestione della connessione.
    let size = options.size // Dimensioni del componente, svg

    /* Elementi d'utility */
    const minWidth = 70;
    const minHeight = 70;
    let [moving, setMoving] = useState(false); // Gestione del moving.
    let [resizing, setResizing] = useState(false); // Gestione del resising.
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let [borders, setBorders] = useState([false, false, false, false, false]);
    let curs = "pointer"; // Selettore del pointer.
    let tLength = text.length * 1.1; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /* Refs */
    let inputRef = useRef();
    let entityRef = useRef();

    /**  //Spostare sta roba in ER, non usa gli stati quindi top
     * isOnBorder
     * Funzione che mi indica se un offset è vicino al bordo oppure no.
     * @param offset offset da verificare, che è una coppia di punti.
     * @return borders, array di 5 booleani: il primo indica se qualche bordo è triggerato 
     * mentre gli altri indicano quale o quali bordi sono triggerati.
     */
    const isOnBorder = useCallback((offset) => {
        // flag, dx, top, sn, bot
        let bords = [false, false, false, false, false];
        if (offset.x < 10) {
            bords[3] = true; // lato sinistro
            console.log(bords);
        }
        if (offset.x > size.width - 10) {
            bords[1] = true; // lato destro
        }
        if (offset.y < 10) {
            bords[2] = true; // top
        }
        if (offset.y > size.height - 10) {
            bords[4] = true; // bottom
        }
        for (let i = 1; i < bords.length; i++) {
            if (bords[i]) {
                bords[0] = true;
            }
        }
        console.log(bords);
        return bords;
    });

    /**
     * handleSelection
     * Funzione che gestisce la selezione dell'elemento aggiornando lo slice
     * globale.
     * @param event oggetto evento triggerato onClick.
     */
    const handleSelection = useCallback((event) => {
        event.stopPropagation();
        dispatch(elementsSlice.actions.connecting(id));
        dispatch(elementsSlice.actions.setSelectedElement(id));
    });

    /**
     * handleConnection
     * Funzione che gestisce la connessione (provvisoria) dell'elemento, aggiornanod
     * lo slice globale.
     * @param event oggetto evento triggerato onDoubleClick.
     */
    const handleConnection = useCallback((event) => {
        event.stopPropagation();
        dispatch(elementsSlice.actions.setConnectingElement(id));
    });

    /**
     * handleGrabbing
     * Funzione che gestisce il calcolo dell'offset tra la posizione
     * dell'elemento cliccato e quella dl puntatore, in modo da gestire al
     * meglio il trascinament. 
     * @param event oggetto evento triggerato onMouseDown.
     */
    const handleGrabbing = useCallback((event) => {
        event.preventDefault();
        dispatch(elementsSlice.actions.setConnectingElement(0));
        inputRef.current.blur();
        // Calcoliamo l'offset, quanto è distante il puntatore dall'origine del componente
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        // Controlliamo se è sui bordi
        setBorders(isOnBorder({ x, y }));
        console.log(borders);
        if (borders[0]) {
            setResizing(true);
        } else {
            setMoving(true);
        }
        setOffset({ x, y });
    });

    /**
     * handleNotGrabbingAnymore
     * Funzione che gestisce il fatto che l'utente non prema più sull'elemento.
     */
    const handleNotGrabbingAnymore = useCallback(() => {
        setMoving(false);
        setResizing(false);
    });

    /**
     * handleDragging
     * Funzione che gestisce il trascinamento dell'elemento.
     * @param event oggetto evento triggerato onMouseMove.
     */
    const handleDragging = useCallback((event) => {
        event.preventDefault();  // Sistema il dragging merdoso
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        setBorders(isOnBorder({ x, y }));
        if (moving) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "position", value: { x, y } }))
        } else if (resizing) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            console.log("facciamo resizing");
        }
    });

    /**
     * handleLeaving
     * Funzione che gestisce il mouse che se va dalla superficie dell'elemento.
     * Deve essere messa per forza sennò movine e resizing rimarrebbero settati, fornendo
     * una brutta UE. 
     */
    const handleLeaving = useCallback(() => {
        setMoving(false);
        setResizing(false);
    });

    /**
     * handleInput
     * Funzione che gestisce l'input da textbox dell'utente.
     * @param event oggetto evento triggerato onChange.
     */
    const handleInput = useCallback((event) => {
        dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "text", value: event.target.value }));
        dispatch(elementsSlice.actions.modifyElementOptions({
            id: id,
            option: "size",
            value: {
                width: inputRef.current.offsetWidth + minWidth,
                height: minHeight,
            }
        }));
    });

    /**
     * handleInputInsert
     * Funzione che gestisce la propagazione dell'evento onClick della textbox al div esterno.
     * Siccome l'evento che vogliamo prelevare è lo stesso dell'elemento contenente, di default viene
     * triggerata quella, non facendo più modificare la textbox.
     * @param event oggetto evento triggerato onClick.
     */
    const handleInputInsert = useCallback((event) => {
        event.stopPropagation();
    });

    /* Gestione dinamica del cursore */
    if (selected) {
        if (moving) {
            curs = "grabbing";
        } else {
            if (borders[0]) {
                if (borders[1] || borders[3]) {
                    curs = "e-resize";
                } 
                if (borders[2] || borders[4]) {
                    curs = "n-resize";
                } 
                if ((borders[1] && borders[2]) || borders[3] && borders[4]) {
                    curs = "ne-resize";
                } 
                if ((borders[2] && borders[3]) || (borders[4] && borders[1])) {
                    curs = "nw-resize";
                }
            } else {
                curs = "grab";
            }
        }
    }

    /* Rendering */
    return (
        <motion.div
            id={`entity-${id}`}
            onClick={handleSelection}
            onDoubleClick={handleConnection}
            onMouseDown={selected ? handleGrabbing : null}
            onMouseUp={selected ? handleNotGrabbingAnymore : null}
            onMouseMove={selected ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.entity}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs
            }}
            ref={entityRef}
        >
            <input
                id={`input-entity-${id}`}
                type="text"
                value={text}
                ref={inputRef}
                onChange={handleInput}
                onMouseDown={handleInputInsert} // Abbiamo dovuto sovrascrivere l'evento del padre
                className={classes.entityInput}
                style={{
                    width: tLength === 0 ? 20 : tLength + "ch",
                    cursor: selected ? "text" : "pointer"
                }}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    height: size.height,
                    width: !(size.width === 0) ? size.width : minWidth,
                }}
            >
                {connecting &&
                    <motion.rect
                        id={`connect-entity-${id}`}
                        x="4"
                        y="4"
                        rx="5"
                        ry="5"
                        fill="transparent"
                        stroke="black"
                        strokeWidth="1"
                        style={{
                            zIndex: 1,
                        }}
                        initial={{
                            height: size.height - 14,
                            width: size.width - 14,
                        }}
                        animate={{
                            height: size.height - 8,
                            width: size.width - 8,
                        }}
                        transition={{ duration: 0.1 }}
                    />
                }
                {/* Rettangolo che costituisce l'area dell'entità*/}
                <motion.rect
                    id={`body-entity-${id}`}
                    height={size.height - 14.5}
                    width={size.width - 14.5}
                    x="7"
                    y="7"
                    rx="5"
                    ry="5"
                    fill="white"
                    stroke="black"
                    animate={{
                        zIndex: 3,
                        cursor: curs,
                        strokeWidth: selected ? "2.5px" : "0.5px",
                    }}
                    transition={{ duration: 0.1 }}
                />
            </svg>
        </motion.div>
    );
});
