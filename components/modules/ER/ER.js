'use client';

import { useSelector } from 'react-redux';
import Workpane from '../general/Workpane.js';
import Generator from './Generator.js';
import { useCallback, useState } from 'react';

/**
 * ER
 * Componente che renderizza e gestisce il modulo ER.
 */
export default function ER() {
    /* Campi di Esemplare */
    let elements = useSelector(state => state.designElements);
    let wpHeight = 720;
    let wpWidth = 1920;
    let functs = []; // Inseriamo le funzionalità, quindi funzioni, da passare agli elementi, ma vediamo se è utile
    
    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Generator generate={elements} functs={functs}/>
            </Workpane>
        </>
    );
}