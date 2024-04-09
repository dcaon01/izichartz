'use client';

import { useSelector } from 'react-redux';
import Workpane from '../general/Workpane.js';
import Generator from './Generator.js';
import { useCallback, useEffect, useState } from 'react';
import { elementsSlice } from '@/store/design/elements-slice.js';

/**
 * ER
 * Componente che renderizza e gestisce il modulo ER.
 * Ci sono definite tutte le funzioni che gestiscono una logica generale.
 * Le logiche dei singoli componenti, anche se ridondanti, sono all'interno di essi stessi.
 */
export default function ER() {
    /* Campi di Esemplare */
    let elements = useSelector(state => state.designElements);
    let wpHeight = 720;
    let wpWidth = 1920;
    let functs = {}; // Inseriamo le funzionalità, quindi funzioni, da passare agli elementi, ma vediamo se è utile

    /**
     * whoIsConnecting
     * @param state stato corrente.
     * @returns 0 se nessun elemento è in connessione, oppure l'id dell'elemento che
     * è in connessione.
     */
    const whoIsConnecting = useCallback(() => {
        let id = 0;
        elements.forEach((element) => {
            if (element.options && element.options.connecting === true) {
                id = element.id;
            }
        });
        return id;
    });
    functs["whoIsConnecting"] = whoIsConnecting;

    /**
     * createLinker 
     * Funzione che si occupa della creazione di un linker.
     * @param finishEl elemento finale della connessione.
     */
    const createLinker = useCallback(() => {
        console.log("Crea");
    });
    functs["createLinker"] = createLinker;

    /* Rendering */
    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Generator generate={elements} functs={functs} />
            </Workpane>
        </>
    );
}