'use client'

import classes from "./Zoom.module.css";
import { useState } from "react";
import { robotoMono } from "@/app/fonts";

/**
 * Zoom
 * Funzione componente che funge da selettore per lo zoom degli elementi nel 
 * workpane.
 * @refactor sistemare l'input ma anche no.
 */
export default function Zoom() {
    let [zoom, setZoom] = useState(100);

    function handleZoomChange(event) {
        setZoom(event.target.value);
    }

    function handleBlur(event) {
        if (event.target.value > 200 || event.target.value < 50) {
            setZoom(100);
        } if (!Number.isInteger(event.target.value)) {
            console.log("Not Integer");
            setZoom(100);
        } else {
            setZoom(event.target.value);
        }
    }

    function handleReset() {
        setZoom(100);
    }

    function handleSelection(event) {
        event.preventDefault();
    }

    /*
    function handleEnter(event) {
        event.stopPropagation();
        event.preventDefault();
    }*/

    return (
        <div className={classes.zoom}>
            <form className={classes.formZoom}>
                <input className={classes.rangeSelector} type="range" min="50" max="200" step="10" value={zoom} onChange={handleZoomChange} onDoubleClick={handleReset}/>
            </form>
            <p className={`${robotoMono.className} ${classes.valueSelector}`}>&nbsp;{zoom}%</p>
        </div>
    );
};