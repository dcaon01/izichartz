'use client'

import classes from "./Zoom.module.css";
import { robotoMono } from "@/app/fonts";
import { useDispatch } from "react-redux";
import { memo } from "react";
import { elementsSlice } from "@/store/design/elements-slice";

/**
 * Zoom
 * Funzione componente che funge da selettore per lo zoom degli elementi nel 
 * workpane.
 * @refactor sistemare l'input ma anche no.
 */
export const Zoom = memo(function Zoom({ zoom }) {
    const dispatch = useDispatch();

    function handleZoomChange(event) {
        event.preventDefault();
        event.stopPropagation();
        dispatch(elementsSlice.actions.modifyZoom(event.target.value));
    }

    function handleReset() {
        event.preventDefault();
        event.stopPropagation();
        dispatch(elementsSlice.actions.modifyZoom(70));
    }

    return (
        <div className={classes.zoom}>
            <form className={classes.formZoom}>
                <input className={classes.rangeSelector} type="range" min="10" max="200" step="10" value={zoom} onChange={handleZoomChange} onDoubleClick={handleReset} />
            </form>
            <p className={`${robotoMono.className} ${classes.valueSelector}`}>&nbsp;{zoom}%</p>
        </div>
    );
});