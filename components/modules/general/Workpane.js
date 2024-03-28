'use client';

import { useDispatch } from 'react-redux';
import classes from './Workpane.module.css';
import { globalSlice } from '@/store/design/global-slice';

/**
 * Workpane
 * Componente che renderizza l'elemento sulla quale vivono gli elementi di design.
 * @param h: altezza dell'elemento.
 * @param w: larghezza dell'elemento.
 * @param children: l'elemento viene utilizzato con figli al suo interno.
 */
export default function Workpane(props) {
    /* Campi di esemplare */
    const height = props.h;
    const width = props.w;

    /* Elementi di utility */
    const dispatch = useDispatch();

    /**
     * handleClicked
     * Funzione che gestisce il click sull'elemento. Si vuole che tutti gli elementi
     * selezionati vengano deselezionati di default.
     */
    function handleClicked() {
        dispatch(globalSlice.actions.selection(0));
    }

    /* Rendering */
    return (
        <div
            className={classes.view}
            onClick={handleClicked}
        >
            <div 
                className={classes.pane}
                style={{ height: height, width: width }}
            >
                {props.children}
            </div>
        </div>
    );
}