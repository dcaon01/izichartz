'use client';

import { useDispatch } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { elementsSlice } from "@/store/design/elements-slice";
import { motion } from 'framer-motion';
import LinkersCreators from './LinkersCreators.js';

/**
 * Entity
 * Componente che renderizza un'entità del modello ER.
 * @param id indice e identificatore dell'elemento all'interno dell'array degli elementi.
 * @param options opzioni utili al rendering dell'elemento.
 * @param selected flag di selezione dell'elemento.
 */
export const Entity = memo(function Entity({ id, options, selected, links, functs }) {
    /* Prelevamento delle opzioni utili */
    let text = options.text; // Testo interno al rettangolo.
    let position = options.position; // Oggetto posizione.

    /* Elementi d'utility */
    let [grabbing, setGrabbing] = useState(false); // Gestione del grabbing.
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let curs = "pointer"; // Selettore del pointer.
    let tLength = text.length * 1.5; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    let [linkersCircleSvgWidth, setLinkersCircleSvgWidth] = useState(0); // Gestione della larghezza dell'svg dei creatori di linkers.
    let [linkersCircleSvgHeight, setLinkersCircleSvgHeight] = useState(0); // Gestione dell'altezza dell'svg dei creatori di linkers.
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /* Refs */
    let inputRef = useRef();
    let entityRef = useRef();

    // Utilizzo di useEffect per permettere prima la renderizzazione e istanziazione delle ref.
    useEffect(() => {
        setLinkersCircleSvgHeight(entityRef.current.offsetHeight + 40);
        setLinkersCircleSvgWidth(entityRef.current.offsetWidth + 40);
    }, [entityRef, linkersCircleSvgHeight, text]);

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
     * handleGrabbing
     * Funzione che gestisce il calcolo dell'offset tra la posizione
     * dell'elemento cliccato e quella dl puntatore, in modo da gestire al
     * meglio il trascinamento. 
     * @param event oggetto evento triggerato onMouseDown.
     */
    const handleGrabbing = useCallback((event) => {
        event.preventDefault();
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
        console.log(event.target.id);
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
     * @param event oggetto evento triggerato onChange.
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

    /* Rendering */
    return (
        <motion.div
            onClick={handleSelection}
            onMouseDown={selected ? handleGrabbing : null}
            onMouseUp={selected ? handleNotGrabbingAnymore : null}
            onMouseMove={selected ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.entity}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
            }}
            animate={{
                border: selected ? "3px solid black" : "1px solid black",
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
                    cursor: selected ? "text" : "pointer"
                }}
            />
            { selected && 
                <LinkersCreators 
                    height={linkersCircleSvgHeight} 
                    width={linkersCircleSvgWidth}
                    functs={functs}
                />
            }
        </motion.div>
    );
});
