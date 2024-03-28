'use client';

import { useSelector } from 'react-redux';
import Workpane from '../general/Workpane.js';
import Generator from './Generator.js';

/**
 * ER
 * Componente che renderizza e gestisce il modulo ER.
 */
export default function ER() {
    let components = useSelector(state => state.designElements);
    let wpHeight = 1920;
    let wpWidth = 720;
    
    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Generator generate={components}/>
            </Workpane>
        </>
    );
}

/* Per generare i componenti giusti potremmo andare ad utilizzare un componente apposito,
*  che gestisce tutti i casi di rendering di componente in base al campo "type" che deve gestire.
*  In questo modo avremmo un mapping automatico e "quasi generale", da mettere in lib.
*/