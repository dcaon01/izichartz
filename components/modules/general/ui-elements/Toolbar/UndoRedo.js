'use client'

import classes from "./UndoRedo.module.css";
import { useState } from "react";

export default function UndoRedo() {
    let [bold1, setBold1] = useState("");
    let [bold2, setBold2] = useState("");

    function handleBold1() {
        setBold1("-bold");
    }

    function handleBold2() {
        setBold2("-bold");
    }

    function handleUnbold1() {
        setBold1("");
    }

    function handleUnbold2() {
        setBold2("");
    }

    return (
        <div className={classes.undoredo}>
            <img className={classes.undoredoImage} src={`/assets/global/undo${bold1}.png`} height={18} width={18} onMouseEnter={handleBold1} onMouseLeave={handleUnbold1}/>
            <img className={classes.undoredoImage} src={`/assets/global/forward${bold2}.png`} height={18} width={18} onMouseEnter={handleBold2} onMouseLeave={handleUnbold2}/>
        </div>
    );
}

