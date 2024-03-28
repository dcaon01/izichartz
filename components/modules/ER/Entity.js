'use client';

import { useDispatch, useSelector } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef } from "react";
import { globalSlice } from "@/store/design/global-slice";
import { elementsSlice } from "@/store/design/elements-slice";
import { motion } from 'framer-motion';

export default function Entity({ id }) {
    /* Campi di esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text); // Testo interno al rettangolo
    let tLength = text.length * 1.1;
    console.log(tLength);
    let position = useSelector(state => state.designElements[id - 1].options.position); // Oggetto posizione

    /* Variabili d'utility */
    let [grabbing, setGrabbing] = useState(false);
    let selectedId = useSelector(state => state.designGlobal.selected);
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset
    let curs = "pointer";
    const dispatch = useDispatch();

    /* Refs */
    let inputRef = useRef();

    function handleSelection(event) {
        event.stopPropagation();
        dispatch(globalSlice.actions.selection(id));
    }

    /* Funzione per la gestione del dragging dell'oggetto */
    function handleGrabbing(event) {
        event.preventDefault();
        inputRef.current.blur();
        setGrabbing(true);
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        setOffset({ x, y });
    }

    /* Funzione per la gestione del rilascio del click sull'oggetto */
    function handleNotGrabbingAnymore() {
        setGrabbing(false);
    }

    /* Funzione per la gestione del dragging dell'oggetto */
    function handleDragging(event) {
        event.preventDefault();  // Non sistema il ritardo del dragging
        if (grabbing) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            dispatch(elementsSlice.actions.modifyOptionElement({ id: id, option: 'position', value: { x, y } }))
        }
    }

    /* Funzione per gestire il mouse che se ne va dall'oggetto */
    function handleLeaving() {
        setGrabbing(false);
    }

    function handleInput(event) {
        dispatch(elementsSlice.actions.modifyOptionElement({ id: id, option: 'text', value: event.target.value }));
    }

    function handleInputInsert(event) {
        event.stopPropagation();
    }

    if (selectedId === id) {
        if (grabbing) {
            curs = "grabbing"
        } else {
            curs = "move";
        }
    }

    /* RENDERING */
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
            animate={{border: selectedId === id ? "3px solid black" : "1px solid black"}}
            transition={{duration: 0.1}}
        >
            <input
                id="input"
                type="text"
                value={text}
                ref={inputRef}
                onChange={handleInput}
                onMouseDown={handleInputInsert} // Abbiamo dovuto sovrascrivere l'evento del padre
                className={classes.entityInput}
                style={{
                    width: tLength === 0 ? 20 : tLength + 'ch',
                    cursor: selectedId === id ? 'text' : 'pointer'
                }}
            />
        </motion.div>
    );
}
