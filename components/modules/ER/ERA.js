'use client';

import classes from "./EntityRelationship.module.css";
import { useDispatch } from "react-redux";
import { useRef, memo } from "react";
import { elementsSlice } from "@/store/design/elements-slice";
import EntityGraphics from "./EntityGraphics.js";
import RelationshipGraphics from "./RelationshipGraphics.js";
import AttributeGraphics from "./AttributeGraphics.js";
import DFLRElement from "../general/design-elements/DFLRElement.js";

/**
 * Entity
 * Componente che renderizza un'entità, una relazione o un attributo del modello ER.
 * @param id indice e identificatore dell'elemento all'interno dell'array degli elementi.
 * @param type tipo di elemento.
 * @param options opzioni utili al rendering dell'elemento.
 * @param selected flag di selezione dell'elemento.
 */
export const ERA = memo(function ERA({ id, type, options, selected }) {
    /* Prelevamento delle opzioni utili */
    let text = options.text; // Testo interno al rettangolo.
    let connecting = options.connecting; // Gestione della connessione.
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
        let newHeight = (inputRef.current.getBoundingClientRect().height * size.width) / (2 * (size.width - inputRef.current.getBoundingClientRect().width)) + 80;
        dispatch(elementsSlice.actions.setConnectingElement(0));
        dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "text", value: { value: event.target.value, width: inputRef.current.getBoundingClientRect().width } }));
        dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({
            id: id,
            option: "size",
            value: {
                width: oldEffectiveWidth + inputRef.current.getBoundingClientRect().width,
                height: type === "relationship" ? (size.height < newHeight ? newHeight : size.height) : size.height,
            }
        }));
        if (type === "relationship") {
            dispatch(elementsSlice.actions.modifyElementOptions({
                id: id,
                option: "minSize",
                value: newHeight
            }));
        }
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
        <DFLRElement
            id={id}
            type={type}
            options={options}
            selected={selected}
        >
            <input
                id={`input-entity-${id}`}
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
                    color: options.key ? "white" : "black",
                    backgroundColor: options.key ? "black" : "white",
                }}
                autoComplete="off"
            />
            {type === "entity" && <EntityGraphics id={id} width={size.width} height={size.height} selected={selected} connecting={connecting} />}
            {type === "relationship" && <RelationshipGraphics id={id} width={size.width} height={size.height} selected={selected} connecting={connecting} />}
            {type === "attribute" && <AttributeGraphics id={id} width={size.width} height={size.height} selected={selected} connecting={connecting} isKey={options.key} />}
        </DFLRElement>
    );
});

/* STRUTTURE 

> Entity
{
    type: "entity",
    id: numero di elemento,
    selected: false,
    options: {
        text: { value: "ENTITY2", width: 49.5 },
        position: {
            x: 400,
            y: 300,
        },
        minSize: 70,
        size: {
            width: 127.75,
            height: 70,
        },
        connecting: false,
    },
},

> Relationship
{
    type: "relationship",
    id: numero di elemento,
    selected: false,
    options: {
        text: { value: "", width: 0 },
        position: {
            x: 600,
            y: 150,
        },
        minSize: 80,
        size: {
            width: 80,
            height: 80,
        },
        connecting: false
    },
},

> Attribute
{
    type: "Attribute",
    id: numero di elemento,
    selected: false,
    options: {
        text: { value: "ENTITY2", width: 49.5 },
        position: {
            x: 400,
            y: 300,
        },
        minSize: 70,
        size: {
            width: 127.75,
            height: 70,
        },
        connecting: false,
        key: true
    },
},
*/
