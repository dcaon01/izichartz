'use client';

import { useDispatch } from 'react-redux';
import classes from './Workpane.module.css';
import { elementsSlice } from '@/store/design/elements-slice';
import { memo } from 'react';

/**
 * Workpane
 * Componente che renderizza l'elemento sulla quale vivono gli elementi di design.
 * Andiamo a far scegliere delle dimensioni fisse (o variabili) all'utente
 * @param h: altezza dell'elemento.
 * @param w: larghezza dell'elemento.
 * @param onContextMenu: funzione che viene utilizzata dal modulo che lo richiama per gestire quello che vuole
 * @param children: l'elemento viene utilizzato con figli al suo interno.
 */
export const Workpane = memo(function Workpane({ children, h, w, onContextMenu, onClick }) {
    /* Campi di esemplare */
    const height = h;
    const width = w;

    /* Elementi di utility */
    const dispatch = useDispatch();

    /**
     * handleClicked
     * Funzione che gestisce il click sull'elemento. 
     * Si vuole che tutti gli elementi selezionati vengano deselezionati di default.
     * Si vuole che tutti gli elementi in connessione vengano resettati.
     * @refactor potrei passare pure questa dal modulo
     */
    function handleClicked(event) {
        // Creare un'azione solo per il resetting?
        dispatch(elementsSlice.actions.setSelectedElement(0));
        dispatch(elementsSlice.actions.setConnectingElement(0));
    }

    /* Rendering */
    return (
        <div
            className={classes.view}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            <div
                className={classes.pane}
                style={{ height: height, width: width }}
            >
                {children}
            </div>
        </div>
    );
});