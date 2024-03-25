'use client';

import classes from "./Entity.module.css";
import { useState, useRef, useEffect } from "react";

export default function Entity({key, options}) {
    /* Campi di esemplare */
    let [id, setId] = useState(key);
    let [text, setText] = useState(options.text); // Testo interno al rettangolo
    let [position, setPositon] = useState(options.position); // Oggetto posizione

    /* Refs */
    let inputRef = useRef();

    /* Variabili usiliarie */
    let [clicked, setClicked] = useState(false);
    let [selected, setSelected] = useState(false);
    let [offset, setOffset] = useState({ x: 0, y: 0 }) // Oggetto di offset
    let curs = "pointer";

    function handleSelection() {
        setSelected(true);
    }

    function handleDeselection(event) {
        if (event.key === 'Enter' || event.key === 'Esc') {
            setSelected(false);
        }
    }

    useEffect(() => {
        handleDeselection(Event);
    }, [selected]);


    /* Funzione per la gestione del dragging dell'oggetto */
    function handleClicking(event) {
        event.preventDefault();
        setClicked(true);
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        setOffset({ x, y });
    }

    /* Funzione per la gestione del rilascio del click sull'oggetto */
    function handleNotClickingAnymore() {
        setClicked(false);
    }

    /* Funzione per la gestione del dragging dell'oggetto */
    function handleDragging(event) {
        event.preventDefault();  // Non sistema il ritardo del dragging
        if (clicked) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            setPositon({ x, y })
        }
    }

    /* Funzione per gestire il mouse che se ne va dall'oggetto */
    function handleLeaving(event) {
        setClicked(false);
    }

    function handleInput() {
        setText(inputRef.current.value);
    }

    if (selected) {
        if (clicked) {
            curs = "grabbing"
        } else {
            curs = "move";
        }
    }

    /* RENDERING */
    return (
        <div
            onClick={handleSelection}
            onMouseDown={selected ? handleClicking : null}
            onMouseUp={selected ? handleNotClickingAnymore : null}
            onMouseMove={selected ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.rectangle}
            onKeyDown={handleDeselection}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
                border: selected ? "3px solid black" : "1px solid black"
            }}
        >
            <span
                contentEditable={selected}
                role="textbox"
                ref={inputRef}
                className={classes.rectangleInput}
                onChange={handleInput}
                style={{
                    cursor: selected ? "text" : "pointer"
                }}
            >
                {text}
            </span>
        </div>
    );
}
