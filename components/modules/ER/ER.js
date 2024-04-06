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
    let [linkerCreation, setLinkerCreation] = useState(null);
    let functs = []; // Inseriamo le funzionalità da passare agli elementi.

    /**
     * creation
     * Funzione che gestisce la creazione (provvisoria) di un linker. 
     * Genera una 
     */
    const createLinker = useCallback((event, startPosX, startPosY) => {
        setLinkerCreation({ sX: startPosX, sY: startPosY, eX: event.clientX, eY: event.clientY });
    });
    functs.push(createLinker);

    const handleLinkerCreation = useCallback((event) => {
        let isLined = false;
        elements.forEach(element => {
            null;
        });
    });
    
    return (
        <>
            <Workpane onMouseUp={handleLinkerCreation} h={wpHeight} w={wpWidth}>
                <Generator generate={elements} functs={functs}/>
                {linkerCreation &&
                    <svg
                        style={{
                            position: "absolute",
                            height: wpHeight,
                            width: wpWidth,
                        }}
                    >
                        <line
                            x1={linkerCreation.sX}
                            y1={linkerCreation.sY}
                            x2={linkerCreation.eX}
                            y2={linkerCreation.eY}
                            style={{
                                stroke: "grey",
                                strokeWidth: 2
                            }}
                        />
                    </svg>
                }
            </Workpane>
        </>
    );
}