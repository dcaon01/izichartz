'use client';

import classes from "./Rectangle.module.css";
import { useState } from "react";

export default function Rectangle({ t, x, y }) {
    /* Campi di esemplare */
    let [text, setText] = useState(t); // Testo interno al rettangolo
    let [position, setPositon] = useState({ x, y }); // Oggetto posizione
    let [offset, setOffset] = useState({ x: 0, y: 0 })

    /* Variabili di stile */
    let [clicked, setClicked] = useState(false);

    /* Funzione per la gestione del dragging dell'oggetto */
    function handleClicking(event) {
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
        if (clicked) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            setPositon({x, y})
        }
    }

    /* Funzione per gestire il mouse che se ne va dall'oggetto */
    function handleLeaving(){
        setClicked(false);
    }

    /* RENDERING */
    return (
        <div
            onMouseDown={handleClicking}
            onMouseUp={handleNotClickingAnymore}
            onMouseMove={handleDragging}
            onMouseLeave={handleLeaving}
            className={classes.rectangle}
            style={{
                top: position.y,
                left: position.x,
                cursor: clicked ? 'grabbing' : 'grab'
            }}
        >
            <p className={classes.text}>
                {text}
            </p>
        </div>
    );
}
