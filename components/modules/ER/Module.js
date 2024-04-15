'use client';

import { useSelector } from 'react-redux';
import { Workpane } from '../general/Workpane.js';
import Generator from './Generator.js';
import { useCallback, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { elementsSlice } from '@/store/design/elements-slice.js';

/**
 * ER
 * Componente che renderizza e gestisce il modulo ER.
 * Ci sono definite tutte le funzioni che gestiscono una logica generale.
 * Le logiche dei singoli componenti, anche se ridondanti, sono all'interno di essi stessi.
 */
export default function Module() {
    /* Campi di Esemplare */
    const elements = useSelector(state => state.designElements);
    const wpHeight = 720;
    const wpWidth = 1920;
    console.log(elements);

    /* Elementi di Utility */
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /**
    * handleKeyPress
    * Funzione che si occupa di rilevare se qualche tasto è stato premuto e agire di conseguenza.
    * Per ora gestiamo solo l'invio, come mantenimento dello stato attuale e deselezione. Potremmo pensare di inviare
    * le modifiche con una actionCreator. Quindi inviamo le modifiche (o le salviamo anche nello storico) solo se l'elemento è 
    * stato deselezionato e lo stato è cambiato nello storico.
    * Come esc si potrebbe implementare un indietro nello storico e inviare la modifica.
    */
    const handleKeyDown = useCallback((event) => {
        if (event.key === "Enter") {
            dispatch(elementsSlice.actions.setSelectedElement(0));
            dispatch(elementsSlice.actions.setConnectingElement(0));
            // Salva lo stato nello storico.
            // Invia i dati al DB.
        }
    });
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, []);

    /* Rendering */
    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Generator generate={elements} />
            </Workpane>
        </>
    );
}