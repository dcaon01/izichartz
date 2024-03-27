'use client';

import { useDispatch, useSelector } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef } from "react";
import { globalSlice } from "@/store/design/global-slice";
import { elementsSlice } from "@/store/design/elements-slice";

export default function Entity({ id }) {
    console.log('render');


    /* Campi di esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text); // Testo interno al rettangolo
    let position = useSelector(state => state.designElements[id - 1].options.position); // Oggetto posizione

    /* Variabili d'utility */
    let [grabbing, setGrabbing] = useState(false);
    console.log(grabbing);
    let selectedId = useSelector(state => state.designGlobal.selected);
    console.log(selectedId);
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset
    let curs = "pointer";
    let dispatch = useDispatch();

    function handleSelection() {
        dispatch(globalSlice.actions.selection(id));
    }

    /* Funzione per la gestione del dragging dell'oggetto */
    function handleGrabbing(event) {
        event.preventDefault();
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
        dispatch(elementsSlice.actions.modifyOptionElement({id: id, option: 'text', value: event.target.value}));
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
        <div
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
                border: selectedId === id ? "3px solid black" : "1px solid black"
            }}
        >
            <input 
                id="input"
                readOnly={!(selectedId === id)}
                type="text"
                value={text}
                onChange={handleInput}
                className={classes.entityInput}          
            />
        </div>
    );
}
