'use client';

import { useSelector } from 'react-redux';
import { Workpane } from '../general/ui-elements/Workpane.js';
import ERGenerator from './ERGenerator.js';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { elementsSlice } from '@/store/design/elements-slice.js';
import ERContextMenu from "./ERContextMenu.js";
import { AnimatePresence } from 'framer-motion';

/**
 * ER
 * Componente che renderizza e gestisce il modulo ER.
 * Ci sono definite tutte le funzioni che gestiscono una logica generale.
 * Le logiche dei singoli componenti, anche se ridondanti, sono all'interno di essi stessi.
 */
export default function ERModule() {
    /* Campi di Esemplare */
    const state = useSelector(state => state.designElements);
    const wpHeight = state.workpane.height;
    const wpWidth = state.workpane.width;
    let [contextMenu, setContextMenu] = useState({
        rendered: false,
        x: 0,
        y: 0
    });
    console.log(state);

    /* Elementi di Utility */
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /**
    * handleKeyDown
    * Funzione che si occupa di rilevare se qualche tasto è stato premuto e agire di conseguenza.
    * Per ora gestiamo solo l'invio, come mantenimento dello stato attuale e deselezione. Potremmo pensare di inviare
    * le modifiche con una actionCreator. Quindi inviamo le modifiche (o le salviamo anche nello storico) solo se l'elemento è 
    * stato deselezionato e lo stato è cambiato nello storico.
    * Come esc si potrebbe implementare un indietro nello storico e inviare la modifica.
    */
    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === "Escape") {
            setContextMenu({
                rendered: false,
                x: 0,
                y: 0
            });
            dispatch(elementsSlice.actions.setSelectedElement(0));
            dispatch(elementsSlice.actions.setConnectingElement(0));
            // Salva lo stato nello storico.
            // Invia i dati al DB.
        }
    }

    /**
     * handleRightClickMenu
     * Funzione per la gestione del right click sul workpane
     * Renderizziamo un menu per la gestione delle azioni, come copia,
     * taglia, incolla, new entity, new relationship, etc.
     */
    function handleRightClickMenu(event) {
        event.stopPropagation();
        event.preventDefault(); // non facciamo attivare del browser
        // Controllare anche che il contextMenu non vada fuori dalla schermata
        if (contextMenu.rendered) {
            setContextMenu({
                rendered: false,
                x: 0,
                y: 0
            });
        } else {
            setContextMenu({
                rendered: true,
                x: event.clientX,
                y: event.clientY ,
            });
        }
    }

    /** 
     * handleWorkpaneClicked
     * Funzione che si occupa di deselezionare tutti gli elementi 
     * e/o chiudere tutti i pop-up
     */
    function handleWorkpaneClicked(event) {
        // Creare un'azione solo per il resetting?
        dispatch(elementsSlice.actions.setSelectedElement(0));
        dispatch(elementsSlice.actions.setConnectingElement(0));
        setContextMenu({
            rendered: false,
            x: 0,
            y: 0
        });
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, []);

    /* Rendering */
    return (
        <>
            {/* Possiamo usare suspanse nel mentre che si caricano i dati */}
            <Workpane h={wpHeight} w={wpWidth} zoom={state.zoom} onContextMenu={handleRightClickMenu} onClick={handleWorkpaneClicked}>
                <ERGenerator generate={state.elements} />
            </Workpane>
            <AnimatePresence>
                {contextMenu.rendered && <ERContextMenu posX={contextMenu.x} posY={contextMenu.y} />}
            </AnimatePresence>
        </>
    );
}