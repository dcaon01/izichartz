import { useDispatch, useSelector } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef } from "react";
import { globalSlice } from "@/store/design/global-slice";
import { elementsSlice } from "@/store/design/elements-slice";

export default function Entity({ id }) {
    /* Campi di esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text); // Testo interno al rettangolo
    let position = useSelector(state => state.designElements[id - 1].options.position); // Oggetto posizione

    /* Refs */
    let inputRef = useRef();

    /* Variabili d'utility */
    let [clicked, setClicked] = useState(false);
    let selectedId = useSelector(state => state.designGlobal.selected);
    let [offset, setOffset] = useState({ x: 0, y: 0 }) // Oggetto di offset
    let curs = "pointer";
    let dispatch = useDispatch();

    function handleSelection() {
        dispatch(globalSlice.actions.selection(id));
    }

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
            dispatch(elementsSlice.actions.modifyOptionElement({ id: id, option: 'position', value: { x, y } }))
        }
    }

    /* Funzione per gestire il mouse che se ne va dall'oggetto */
    function handleLeaving() {
        setClicked(false);
    }

    function handleInput() {
        dispatch(elementsSlice.actions.modifyOptionElement({id: id, option: 'text', value: inputRef.current.value}));
    }

    if (selectedId === id) {
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
            onMouseDown={selectedId === id ? handleClicking : null}
            onMouseUp={selectedId === id ? handleNotClickingAnymore : null}
            onMouseMove={selectedId === id ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.entity}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
                border: selectedId === id ? "3px solid black" : "1px solid black"
            }}
        >
            {
                selectedId === id 
                ?
                    <input 
                        id="input"
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={handleInput}
                        className={classes.entityInput}          
                    />
                :
                    <p 
                        className={classes.entityText}
                    >
                        {text}
                    </p>
            }
        </div>
    );
}
