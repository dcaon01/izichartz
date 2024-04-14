'use client';

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import classes from "./Relationship.module.css";
import { elementsSlice } from "@/store/design/elements-slice.js";

/**
 * Relationship
 * Componente che renderizza una relazione nel modello ER
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
*/
export const Relationship = memo(function Relationship({ id, options, selected }) {
    /* Prelevamento delle opzioni utili */
    let text = options.text; // Testo interno al rettangolo.
    let position = options.position; // Oggetto posizione.
    let connecting = options.connecting // Gestione della connessione.

    /* Elementi d'utility */
    let [grabbing, setGrabbing] = useState(false);
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let tLength = text.length * 1.5; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    let [svgWidth, setWidth] = useState(74);
    let [svgHeight, setHeight] = useState(74);
    let curs = "pointer";
    const dispatch = useDispatch();

    /* Refs */
    let inputRef = useRef();
    let relationshipRef = useRef();

    useEffect(() => {
        setWidth(tLength === 0 ? 74 : inputRef.current.offsetWidth + 74);
        setHeight(tLength === 0 ? 74 : (inputRef.current.offsetHeight * svgWidth) / (2 * (svgWidth - inputRef.current.offsetWidth)) + 74);
    }, [inputRef, svgWidth, relationshipRef, text]);

    /**
     * handleSelection
     * Funzione che gestisce la selezione dell'elemento aggiornando lo slice
     * globale.
     * @param event oggetto evento triggerato onClick.
     */
    const handleSelection = useCallback((event) => {
        event.stopPropagation();
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
     * meglio il trascinamento. 
     * @param event oggetto evento triggerato onMouseDown.
     */
    const handleGrabbing = useCallback((event) => {
        event.preventDefault();
        dispatch(elementsSlice.actions.setConnectingElement(0));
        inputRef.current.blur();
        setGrabbing(true);
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        setOffset({ x, y });
    });

    /**
     * handleNotGrabbingAnymore
     * Funzione che gestisce il fatto che l'utente non prema più sull'elemento.
     */
    const handleNotGrabbingAnymore = useCallback(() => {
        setGrabbing(false);
    });

    /**
     * handleDragging
     * Funzione che gestisce il trascinamento dell'elemento.
     * @param event oggetto evento triggerato onMouseMove.
     */
    const handleDragging = useCallback((event) => {
        event.preventDefault();  // Sistema il dragging merdoso
        if (grabbing) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "position", value: { x, y } }))
        }
    });

    /**
     * handleLeaving
     * Funzione che gestisce il mouse che se va dalla superficie dell'elemento.
     * Deve essere messa per forza sennò grabbing rimarrebbe settato, fornendo
     * una brutta UE. 
     */
    const handleLeaving = useCallback(() => {
        setGrabbing(false);
    });

    /**
     * handleInput
     * Funzione che gestisce l'input da textbox dell'utente.
     * @param event oggetto evento triggerato onChange.
     */
    const handleInput = useCallback((event) => {
        dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "text", value: event.target.value }));
    });

    /**
     * handleInputInsert
     * Funzione che gestisce la propagazione dell'evento onClick della textbox al div esterno.
     * Siccome l'evento che vogliamo prelevare è lo stesso dell'elemento contenente, di default viene
     * triggerata quella, non facendo più modificare la textbox.
     * @param event: oggetto evento triggerato onChange.
     */
    const handleInputInsert = useCallback((event) => {
        event.stopPropagation();
    });

    /* Gestione dinamica del cursore */
    if (selected) {
        if (grabbing) {
            curs = "grabbing"
        } else {
            curs = "move";
        }
    }

    console.log("rendering "+id);

    /* Rendering */
    return (
        <div
            onClick={handleSelection}
            onDoubleClick={handleConnection}
            onMouseDown={selected ? handleGrabbing : null}
            onMouseUp={selected ? handleNotGrabbingAnymore : null}
            onMouseMove={selected ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.relationship}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
            }}
            ref={relationshipRef}
        >
            <input
                id={`input-${id}`}
                type="text"
                value={text}
                ref={inputRef}
                onMouseDown={handleInputInsert}
                onChange={handleInput}
                className={classes.relationshipInput}
                style={{
                    width: tLength === 0 ? 20 : tLength + "ch",
                    cursor: selected ? "text" : "pointer"
                }}
            />
            <svg
                style={{
                    height: svgHeight,
                    width: svgWidth,
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                {connecting &&
                    <motion.polygon
                        fill="transparent"
                        stroke="black"
                        strokeWidth="2,5"
                        style={{ zIndex: 1 }}
                        initial={{
                            points: `8,${svgHeight / 2} ${svgWidth / 2},${svgHeight - 8} ${(svgWidth - 2)},${svgHeight / 2} ${svgWidth / 2},8`
                        }}
                        animate={{
                            points: `2,${svgHeight / 2} ${svgWidth / 2},${svgHeight - 2} ${(svgWidth - 2)},${svgHeight / 2} ${svgWidth / 2},2`
                        }}
                        transition={{ duration: 0.1 }}
                    />
                }
                <motion.polygon
                    points={`8,${svgHeight / 2} ${svgWidth / 2},${svgHeight - 8} ${(svgWidth - 8)},${svgHeight / 2} ${svgWidth / 2},8`}
                    fill="white"
                    stroke="black"
                    animate={{ strokeWidth: selected ? "2.5px" : "0.5px" }}
                    transition={{ duration: 0.1 }}
                    // Al poligon non si possono assegnare cursori
                />
            </svg>
        </div>
    );
});
