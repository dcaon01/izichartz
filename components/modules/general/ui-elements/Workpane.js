'use client';

import classes from './Workpane.module.css';
import { memo, useEffect } from 'react';

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

    /*
    useEffect(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollWidth = document.documentElement.scrollWidth;
        window.scrollTo(0, scrollHeight / 4);
        window.scrollTo(0, scrollWidth / 4);
      }, []);
    */

    /* Rendering */
    return (
        <div
            className={classes.view}
            id="view"
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {children}
        </div>
    );
});