'use client';

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import classes from "./Relationship.module.css";
import { elementsSlice } from "@/store/design/elements-slice";
import { globalSlice } from "@/store/design/global-slice";

/**
 * Relationship
 * Componente che renderizza una relazione nel modello ER
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
*/
export default function Relationship({ id }) {
    /* Campi d'esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text);
    let position = useSelector(state => state.designElements[id - 1].options.position);

    /* Elementi d'utility */
    let [grabbing, setGrabbing] = useState(false);
    let selectedId = useSelector(state => state.designGlobal.selected);
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let tLength = text.length * 1.1; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    let svgWidth = 60 + tLength;
    let curs = "pointer";
    const dispatch = useDispatch();


    /* Refs */
    let inputRef = useRef();

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
        <div
            className={classes.relationship}
            style={{
                top: position.y,
                left: position.x,
            }}
        >
            <svg
                onClick={handleSelection}
                style={{
                    height: 60,
                    width: tLength === 0 ? 60 : svgWidth + "ch",
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.polygon
                    points={`2,30 ${tLength === 0 ? 30 : svgWidth/2},58 ${tLength === 0 ? 58 : (svgWidth - 2)},30 ${tLength === 0 ? 30 : svgWidth/2},2`}
                    className={classes.relationshipDraw}
                    style={{
                        cursor: curs,
                    }}
                    fill="white"
                    stroke="black"
                    animate={{strokeWidth: selectedId === id ? "2.5px" : "0.5px"}}
                    transition={{duration: 0.1}}
                />
            </svg>
            <input
                className={classes.relationshipInput}
                style={{
                    width: tLength === 0 ? 20 : tLength + "ch",
                    cursor: selectedId === id ? "text" : "pointer"
                }}
            />
        </div>
    );
}
