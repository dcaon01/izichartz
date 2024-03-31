'use client';

import { useDispatch, useSelector } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef, useEffect } from "react";
import { globalSlice } from "@/store/design/global-slice";
import { elementsSlice } from "@/store/design/elements-slice";
import { motion } from 'framer-motion';

/**
 * Entity
 * Componente che renderizza un'entità del modello ER.
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
 */
export default function Entity({ id }) {
    /* Campi di esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text); // Testo interno al rettangolo.
    let position = useSelector(state => state.designElements[id - 1].options.position); // Oggetto posizione.
    // Preleviamo i links che hanno come uno dei due apici l'entità in modo da aggiornare il loro rendering durante le modifiche e spostamenti.
    // Siccome facciamo molte operazioni, e non è ottimizzato, dobbiamo spostare la logica in un createSelector che cacha gli stati e renderizza
    // solo se alcune parti cambiano.
    /*
    let links = useSelector((state) => {
        let linksArr = [];
        state.designElements.forEach((element, index) => {
            if(element.type === "Link" && (element.options.linked[0] === id || element.options.linked[1] === id)) {
                linksArr.push(element);
            }
        });
        return linksArr;
    }); // Funziona ma è da memoizare. */

    /* Elementi d'utility */
    let [grabbing, setGrabbing] = useState(false);
    let selectedId = useSelector(state => state.designGlobal.selected);
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let curs = "pointer";
    let tLength = text.length * 1.5; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    const dispatch = useDispatch();

    console.log(id);

    /* Refs */
    let inputRef = useRef();
    let entityRef = useRef();

    useEffect(() => {
        console.log(entityRef.current.offsetWidth);
        console.log(entityRef.current.offsetHeight);
    }, []);

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
        <motion.div
            onClick={handleSelection}
            onMouseDown={selectedId === id ? handleGrabbing : null}
            onMouseUp={selectedId === id ? handleNotGrabbingAnymore : null}
            onMouseMove={selectedId === id ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.entity}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
            }}
            animate={{
                border: selectedId === id ? "3px solid black" : "1px solid black",
            }}
            transition={{ duration: 0.1 }}
            ref={entityRef}
        >
            <input
                id={`input-${id}`}
                type="text"
                value={text}
                ref={inputRef}
                onChange={handleInput}
                onMouseDown={handleInputInsert} // Abbiamo dovuto sovrascrivere l'evento del padre
                className={classes.entityInput}
                style={{
                    width: tLength === 0 ? 20 : tLength + "ch",
                    cursor: selectedId === id ? "text" : "pointer"
                }}
            />
        </motion.div>
    );
}
