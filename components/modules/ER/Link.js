'use client';

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { elementsSlice } from "@/store/design/elements-slice";
import { globalSlice } from "@/store/design/global-slice";

/**
 * Link
 * Componente che renderizza i collegamenti fra entità e relazioni. 
 * Una linea è composta da più segmenti svg.
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
 */
export default function Link({ id }) {
    /* Campi di esemplare */
    let text = useSelector(state => state.designElements[id - 1].options.text);
    let segments = useSelector(state => state.designElements[id - 1].options.segments);
    // Id degli elementi che collega la linea, fondamentali per calcolare 
    let elements = useSelector(state => state.designElements[id - 1].options.elements);
    /* Ora bisognerebbe prelevare le informazoni anche degli elementi che sono indicizzati da elemens, che sono
    sempre e comunque 2, in modo da poter compiere delle operazioni di calcolo nel caso cambiassero posizione. 
    Ma forse questo calcolo deve essere fatto in entity nella gestione dello spostamento. Anche senza forse */ 

    /* Elementi di utility */
    let generatedSegments = segments.map((segment) => {
        <motion.line x1={0} y1={0} x2={0} y2={0} />
    });

    return (
        <div>
            <svg>
                {generatedSegments}
            </svg>
        </div>
    );
};