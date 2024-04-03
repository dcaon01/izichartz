'use client';

import { useState, useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { elementsSlice } from "@/store/design/elements-slice";
import { globalSlice } from "@/store/design/global-slice";

/**
 * Link
 * Componente che renderizza i collegamenti fra entità e relazioni. 
 * Una linea è composta da più segmenti svg. Collega il punto centrale di un elemento ad un altro punto centrale di un elemento.
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
 * @param options: opzioni utili al rendering dell'elemento.
 * @param selected: flag di selezione dell'elemento.
 */
export const Linker = memo(function Linker({ id, options, selected }) {
    /* Campi di esemplare */
    let text = options.text;
    let segments = options.segments;
    // Id degli elementi che collega la linea, fondamentali per calcolare 
    let elements = options.elements;

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
});