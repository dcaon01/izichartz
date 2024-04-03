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
    let wpHeight = 720;
    let wpWidth = 1920;
    
    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Generator generate={components}/>
            </Workpane>
        </>
    );
}