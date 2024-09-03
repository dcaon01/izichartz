'use client'

import classes from "./Zoom.module.css";
import { useState } from "react";
import { robotoMono } from "@/app/fonts";

export default function Zoom() {
    let [zoom, setZoom] = useState(100);

    function handleZoomChange(event) {
        setZoom(event.target.value);
    }

    function handleBlur(event) {
        if (event.target.value > 200 || event.target.value < 50) {
            setZoom(100);
        }
    }

    return (
        <div className={classes.zoom}>
            <form className={classes.formZoom}>
                <input className={classes.rangeSelector} type="range" min="50" max="200" steps="1" value={zoom} onChange={handleZoomChange} />
                <input className={`${classes.valueSelector} ${robotoMono.className}`} type="text" value={zoom} onChange={handleZoomChange} onBlur={handleBlur} />
            </form>
            <p>%</p>
        </div>
    );
};