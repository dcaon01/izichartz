'use client';

import classes from "./EntityRelationship.module.css";
import { useDispatch } from "react-redux";
import { useRef, memo } from "react";
import { elementsSlice } from "@/store/design/elements-slice";
import DFRElement from "../general/design-elements/DFRElement";
import { motion } from "framer-motion";

export const Cardinality = memo(function Cardinality({ id, type, options, selected }) {
    /* Prelevamento delle opzioni utili */
    let text = options.text; // Testo interno al rettangolo
    let size = options.size; // Dimensioni del componente, svg

    /* Elementi di Utility */
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /* Refs */
    let inputRef = useRef();

    /**
     * handleInput
     * Funzione che gestisce l'input da textbox dell'utente.
     * @param event oggetto evento triggerato onChange.
     */
    function handleInput(event) {
        event.stopPropagation();
        let oldEffectiveWidth = size.width - text.width;
        dispatch(elementsSlice.actions.setConnectingElement(0));
        dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "text", value: { value: event.target.value, width: inputRef.current.getBoundingClientRect().width } }));
        dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({
            id: id,
            option: "size",
            value: {
                width: oldEffectiveWidth + inputRef.current.getBoundingClientRect().width,
                height: size.height,
            }
        }));
    }

    /* Spostiamo il focus dell'elemento (togli il contorno in pratica) */
    function handleBlur(event) {
        if (event.key === "Enter") {
            inputRef.current.blur();
        }
    }

    /**
     * handleInputInsert
     * Funzione che gestisce la propagazione dell'evento onClick della textbox al div esterno.
     * Siccome l'evento che vogliamo prelevare è lo stesso dell'elemento contenente, di default viene
     * triggerata quella, non facendo più modificare la textbox.
     * @param event oggetto evento triggerato onClick.
     */
    function handleInputInsert(event) {
        event.stopPropagation();
    }

    /* Gestione dinamica del cursore */

    /* Rendering */
    return (
        <DFRElement
            id={id}
            type={type}
            options={options}
            selected={selected}
        >
            <input
                id={`input-cardinality-${id}`}
                type="text"
                value={text.value}
                ref={inputRef}
                onChange={handleInput}
                onMouseDown={handleInputInsert} // Abbiamo dovuto sovrascrivere l'evento del padre
                className={classes.input}
                onKeyDown={handleBlur}
                style={{
                    width: (text.value.length === 0) ? 20 : (text.value.length * 1.15) + "ch",
                    cursor: selected ? "text" : "pointer",
                    backgroundColor: "transparent"
                }}
                autoComplete="off"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    height: size.height,
                    width: size.width,
                }}
            >
                <motion.rect
                    id={`body-cardinality-${id}`}
                    height={size.height - 14.5}
                    width={size.width - 14.5}
                    x="7"
                    y="7"
                    rx="5"
                    ry="5"
                    stroke="black"
                    fill="transparent"
                    animate={{
                        zIndex: 3,
                        strokeWidth: selected ? "2.5px" : (text.value.length === 0 ? "0.9px" : "0px"),
                    }}
                    transition={{ duration: 0.1 }}
                />
            </svg>
        </DFRElement>
    );
});

/*
> Cardinality
{
    type: "cardinality",
    id: numero di elemento,
    selected: false,
    options: {
        text: { value: "", width: 0 },
        position: {
            x: 400,
            y: 300,
        },
        minSize: 70,
        size: {
            width: 127.75,
            height: 70,
        },
    },
},
*/


