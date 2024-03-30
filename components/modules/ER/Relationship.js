'use client';

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import classes from "./Relationship.module.css";
import { elementsSlice } from "@/store/design/elements-slice";
import { globalSlice } from "@/store/design/global-slice";

/**
 * Relationship
 * Componente che renderizza una relazione nel modello ER
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
*/
export default function Relationship({ id }) {
    /* Campi d'esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text);
    let position = useSelector(state => state.designElements[id - 1].options.position);

    /* Elementi d'utility */
    let [grabbing, setGrabbing] = useState(false);
    let selectedId = useSelector(state => state.designGlobal.selected);
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let tLength = text.length * 1.5; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    let [svgWidth, setWidth] = useState(0);
    let [svgHeight, setHeight] = useState(0);
    let curs = "pointer";
    const dispatch = useDispatch();

    /* Refs */
    let inputRef = useRef();
    useEffect(() => {
        setWidth(tLength === 0 ? 60 : inputRef.current.offsetWidth + 60);
        setHeight(tLength === 0 ? 60 : (inputRef.current.offsetHeight * svgWidth)/(2*(svgWidth - inputRef.current.offsetWidth)) + 60);
    }, [inputRef, svgWidth, text]);

    /**
     * handleSelection
     * Funzione che gestisce la selezione dell'elemento aggiornando lo slice
     * globale.
     * @param event: oggetto evento triggerato onClick.
     */
    function handleSelection(event) {
        event.stopPropagation();
        dispatch(globalSlice.actions.selection(id));
    }

    /**
     * handleGrabbing
     * Funzione che gestisce il calcolo dell'offset tra la posizione
     * dell'elemento cliccato e quella dl puntatore, in modo da gestire al
     * meglio il trascinamento. 
     * @param event: oggetto evento triggerato onMouseDown.
     */
    function handleGrabbing(event) {
        event.preventDefault();
        inputRef.current.blur();
        setGrabbing(true);
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        setOffset({ x, y });
    }

    /**
     * handleNotGrabbingAnymore
     * Funzione che gestisce il fatto che l'utente non prema più sull'elemento.
     */
    function handleNotGrabbingAnymore() {
        setGrabbing(false);
    }

    /**
     * handleDragging
     * Funzione che gestisce il trascinamento dell'elemento.
     * @param event: oggetto evento triggerato onMouseMove.
     */
    function handleDragging(event) {
        event.preventDefault();  // Sistema il dragging merdoso
        if (grabbing) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            dispatch(elementsSlice.actions.modifyOptionElement({ id: id, option: "position", value: { x, y } }))
        }
    }

    /**
     * handleLeaving
     * Funzione che gestisce il mouse che se va dalla superficie dell'elemento.
     * Deve essere messa per forza sennò grabbing rimarrebbe settato, fornendo
     * una brutta UE. 
     */
    function handleLeaving() {
        setGrabbing(false);
    }

    /**
     * handleInput
     * Funzione che gestisce l'input da textbox dell'utente.
     * @param event: oggetto evento triggerato onChange.
     */
    function handleInput(event) {
        //setPoints(`2,30 ${tLength === 0 ? 30 : svgWidth / 2},58 ${tLength === 0 ? 58 : (svgWidth - 2)},30 ${tLength === 0 ? 30 : svgWidth / 2},2`);
        dispatch(elementsSlice.actions.modifyOptionElement({ id: id, option: "text", value: event.target.value }));
    }

    /**
     * handleInputInsert
     * Funzione che gestisce la propagazione dell'evento onClick della textbox al div esterno.
     * Siccome l'evento che vogliamo prelevare è lo stesso dell'elemento contenente, di default viene
     * triggerata quella, non facendo più modificare la textbox.
     * @param event: oggetto evento triggerato onChange.
     */
    function handleInputInsert(event) {
        event.stopPropagation();
    }

    /* Gestione dinamica del cursore */
    if (selectedId === id) {
        if (grabbing) {
            curs = "grabbing"
        } else {
            curs = "move";
        }
    }

    /* Rendering */
    return (
        <div
            onClick={handleSelection}
            onMouseDown={selectedId === id ? handleGrabbing : null}
            onMouseUp={selectedId === id ? handleNotGrabbingAnymore : null}
            onMouseMove={selectedId === id ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.relationship}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
            }}
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
                    cursor: selectedId === id ? "text" : "pointer"
                }}
            />
            <svg
                style={{
                    height: svgHeight,
                    width: svgWidth,
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.polygon
                    points={`2,${svgHeight / 2} ${svgWidth / 2},${svgHeight - 2} ${(svgWidth - 2)},${svgHeight / 2} ${svgWidth / 2},2`}
                    className={classes.relationshipDraw}
                    fill="white"
                    stroke="black"
                    animate={{ strokeWidth: selectedId === id ? "2.5px" : "0.5px" }}
                    transition={{ duration: 0.1 }}
                // Al poligon non si possono assegnare cursori
                />
            </svg>
        </div>
    );
}
