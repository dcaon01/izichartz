'use-client';

import classes from "./DFLRElements.module.css";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { elementsSlice } from "@/store/design/elements-slice";

/**
 * RDFLElement
 * Wrapper per oggetti che devono essere:
 * - Draggable
 * - Flexable
 * - Resizable 
 * @param id identificativo dell'elemento che lo ha richiamato.
 * @param type tipo di elemento che lo utilizza.
 * @param options opzioni dell'elemento per il rendering e l'aggiornamento dello stato.
 * @param selected flag per capire se l'oggetto è stato selezionato.
 */
export default function DFRElement(props) {
    let id = props.id;
    let type = props.type;
    let selected = props.selected
    let position = props.options.position; // Oggetto posizione.
    let size = props.options.size; // Dimensioni del componente, svg
    let text = props.options.text;
    let minSize = props.options.minSize;

    /* Elementi d'utility */
    let [moving, setMoving] = useState(false); // Gestione del moving.
    let [resizing, setResizing] = useState(false); // Gestione del resising.
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let [borders, setBorders] = useState([false, false, false, false, false]);
    let curs = "pointer"; // Selettore del pointer.
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /* Refs */
    let entityRef = useRef();

    /**
     * isOnBorder
     * Funzione che mi indica se un offset è vicino al bordo oppure no.
     * @param offset offset da verificare, che è una coppia di punti.
     * @return borders, array di 5 booleani: il primo indica se qualche bordo è triggerato 
     * mentre gli altri indicano quale o quali bordi sono triggerati.
     */
    function isOnBorder(offset) {
        // flag, dx, top, sn, bot
        let bords = [false, false, false, false, false];
        if (offset.x < 10) {
            bords[3] = true; // lato sinistro
        }
        if (offset.x > size.width - 10) {
            bords[1] = true; // lato destro
        }
        if (offset.y < 10) {
            bords[2] = true; // top
        }
        if (offset.y > size.height - 10) {
            bords[4] = true; // bottom
        }
        for (let i = 1; i < bords.length; i++) {
            if (bords[i]) {
                bords[0] = true;
            }
        }
        return bords;
    };

    /**
     * resising
     * Funzione che gestisce tutti i casi di resizing.
     * @param bordersArray array con le indicazioni sui borders che sono stati triggerati.
     * @param quantity json con la quantità da dimensionare.
     */
    function resize(bordersArray, event, text, position) {
        // right
        if (bordersArray[1]) {
            let newWidth = event.pageX - position.x + 14;
            if (verifyDimensions(newWidth, size.height)[0]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: size.height } }));
            } else {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: size.height } }));
            }
        }
        // bottom
        if (borders[4]) {
            let newHeight = event.pageY - position.y + 14;
            if (verifyDimensions(size.width, newHeight)[1]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: size.width, height: newHeight } }));
            } else {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: size.width, height: minSize } }));
            }
        }
        // top
        if (borders[2]) {
            let pastY = position.y;
            let newHeight = size.height + (pastY - event.pageY + 14);
            if (verifyDimensions(size.width, newHeight)[1]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "position", value: { x: position.x, y: event.pageY - 14 } }));
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: size.width, height: newHeight } }));
            } else {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: size.width, height: minSize } }));
            }
        }
        // left
        if (borders[3]) {
            let pastX = position.x;
            let newWidth = size.width + (pastX - event.pageX + 14);
            if (verifyDimensions(newWidth, size.height)[0]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "position", value: { x: event.pageX - 14, y: position.y } }));
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: size.height } }));
            } else {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: size.height } }));
            }
        }
        // top-right
        if ((borders[1] && borders[2])) {
            let pastY = position.y;
            let newWidth = event.pageX - position.x + 14;
            let newHeight = size.height + (pastY - event.pageY + 14);
            let dimensions = verifyDimensions(newWidth, newHeight);
            if (dimensions[0] && dimensions[1]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "position", value: { x: position.x, y: event.pageY - 14 } }));
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: newHeight } }));
            } else {
                if (!dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: minSize } }))
                }
                if (!dimensions[0]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: newHeight } }));
                }
                if (!dimensions[0] && !dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: minSize } }));
                }
            }
        }
        // bottom-left
        if ((borders[3] && borders[4])) {
            let pastX = position.x;
            let newWidth = size.width + (pastX - event.pageX + 14);
            let newHeight = event.pageY - position.y + 14;
            let dimensions = verifyDimensions(newWidth, newHeight);
            if (dimensions[0] && dimensions[1]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "position", value: { x: event.pageX - 14, y: position.y } }));
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: newHeight } }));
            } else {
                if (!dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: minSize } }))
                }
                if (!dimensions[0]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: newHeight } }));
                }
                if (!dimensions[0] && !dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: minSize } }));
                }
            }
        }
        // top-left
        if ((borders[2] && borders[3])) {
            let pastY = position.y;
            let pastX = position.x;
            let newHeight = size.height + (pastY - event.pageY + 14);
            let newWidth = size.width + (pastX - event.pageX + 14);
            let dimensions = verifyDimensions(newWidth, newHeight);
            if (dimensions[0] && dimensions[1]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "position", value: { x: event.pageX - 14, y: event.pageY - 14 } }));
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: newHeight } }));
            } else {
                if (!dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: minSize } }))
                }
                if (!dimensions[0]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: newHeight } }));
                }
                if (!dimensions[0] && !dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: minSize } }));
                }
            }
        }
        // bottom-right
        if ((borders[1] && borders[4])) {
            let newWidth = event.pageX - position.x + 14;
            let newHeight = event.pageY - position.y + 14;
            let dimensions = verifyDimensions(newWidth, newHeight);
            if (dimensions[0] && dimensions[1]) {
                dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: newHeight } }));
            } else {
                if (!dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: newWidth, height: minSize } }))
                }
                if (!dimensions[0]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: newHeight } }));
                }
                if (!dimensions[0] && !dimensions[1]) {
                    dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "size", value: { width: text.width + minSize, height: minSize } }));
                }
            }
        }
    }

    /**
     * verifyDimensions
     * Funzione che si occupa della verifica delle dimensioni per gli elementi.
     * @param w larghezza da verificare.
     * @param h altezza da verificare.
     * @returns true se le dimensioni vanno bene, false altrimenti.
     */
    function verifyDimensions(w, h) {
        let verify = [true, true];
        if (w < text.width + minSize) {
            verify[0] = false;
        }
        if (h < minSize) {
            verify[1] = false;
        }
        return verify;
    }

    /**
     * handleSelection
     * Funzione che gestisce la selezione dell'elemento aggiornando lo slice
     * globale.
     * @param event oggetto evento triggerato onClick.
     */
    function handleSelection(event) {
        event.stopPropagation();
        event.preventDefault();
        dispatch(elementsSlice.actions.connecting(id));
        dispatch(elementsSlice.actions.setSelectedElement(id));
    }

    /**
     * 
     */
    function handleContextMenu(event) {
        event.preventDefault();
        dispatch(elementsSlice.actions.setSelectedElement(id));
    }

    /**
     * handleGrabbing
     * Funzione che gestisce il calcolo dell'offset tra la posizione
     * dell'elemento cliccato e quella dl puntatore, in modo da gestire al
     * meglio il trascinament. 
     * @param event oggetto evento triggerato onMouseDown.
     */
    function handleGrabbing(event) {
        // Tasto sinistro
        if (event.button === 0) {
            if (event.button)
                dispatch(elementsSlice.actions.setConnectingElement(0));
                let offX = event.pageX - position.x;
                let offY = event.pageY - position.y;
                setOffset({ x: offX, y: offY });
                setBorders(isOnBorder(offset));
                if (borders[0]) {
                    setResizing(true);
                } else {
                    setMoving(true);
                }
        }
        if (event.button === 2) {
            
        }
    }

    /**
     * handleNotGrabbingAnymore
     * Funzione che gestisce il fatto che l'utente non prema più sull'elemento.
     */
    function handleNotGrabbingAnymore() {
        setMoving(false);
        setResizing(false);
    }

    /**
     * handleDragging
     * Funzione che gestisce il trascinamento dell'elemento.
     * @param event oggetto evento triggerato onMouseMove.
     */
    function handleDragging(event) {
        event.preventDefault();  // Sistema il dragging merdoso
        if (moving) {
            let x = event.pageX - offset.x;
            let y = event.pageY - offset.y;
            dispatch(elementsSlice.actions.modifyElementOptionsAndLinkers({ id: id, option: "position", value: { x, y } }));
        } else {
            if (resizing) {
                resize(borders, event, text, position);
            } else {
                let offX = event.pageX - position.x;
                let offY = event.pageY - position.y;
                setOffset({ x: offX, y: offY });
                setBorders(isOnBorder(offset));
            }
        }
    }

    /**
     * handleLeaving
     * Funzione che gestisce il mouse che se va dalla superficie dell'elemento.
     * Deve essere messa per forza sennò movine e resizing rimarrebbero settati, fornendo
     * una brutta UE. 
     */
    function handleLeaving() {
        setMoving(false);
        setResizing(false);
    }

    /* Gestione dinamica del cursore */
    if (selected) {
        if (moving) {
            curs = "grabbing";
        } else {
            if (borders[0]) {
                if (borders[1] || borders[3]) {
                    curs = "e-resize";
                }
                if (borders[2] || borders[4]) {
                    curs = "n-resize";
                }
                if ((borders[1] && borders[2]) || borders[3] && borders[4]) {
                    curs = "ne-resize";
                }
                if ((borders[2] && borders[3]) || (borders[4] && borders[1])) {
                    curs = "nw-resize";
                }
            } else {
                curs = "grab";
            }
        }
    }

    /* Rendering */
    return (
        <motion.div
            id={`${type}-${id}`}
            onClick={handleSelection}
            onContextMenu={handleContextMenu}
            onMouseDown={selected ? handleGrabbing : null}
            onMouseUp={selected ? handleNotGrabbingAnymore : null}
            onMouseMove={selected ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.element}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
            }}
            ref={entityRef}
        >
            {props.children}
        </motion.div>
    );
};