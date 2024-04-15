'use client';

import classes from "./Linker.module.css";
import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Link
 * Componente che renderizza i collegamenti fra entità e relazioni. 
 * Una linea è composta da più segmenti svg. Collega il punto centrale di un elemento ad un altro punto centrale di un elemento.
 * @param id: indice e identificatore dell'elemento all'interno dell'array degli elementi.
 * @param options: opzioni utili al rendering dell'elemento.
 * @param selected: flag di selezione dell'elemento.
 * Se fosse troppo lento il rendering dovremmo pensare a qualcosa di diverso, tipo una gestione mirata del segments, o un svg grande tutto il workpane.
 */
export const Linker = memo(function Linker({ id, options, selected }) {
    /* Campi di esemplare */
    let text = options.text; // Cardinalità.
    let segments = options.segments; // Segmenti di cui è composto il linker.
    let minX = 0, maxX = 0, minY = 0, maxY = 0; // Veriabili per il calcolo della dimensione e posizionamento dell'svg.

    /* Elementi di utility */
    let generatedSegments = segments.map((segment, index) => {
        if (segments.length === 1) { // C'è un solo segmento che compone il linker.
            minX = maxX = segment.p1.x;
            minY = maxY = segment.p1.y;
            // p2
            if (segment.p2.x < minX) {
                minX = segment.p2.x;
            }
            if (segment.p2.x > maxX) {
                maxX = segment.p2.x;
            }
            if (segment.p2.y < minY) {
                minY = segment.p2.y;
            }
            if (segment.p2.y > maxY) {
                maxY = segment.p2.y;
            }
            return (
                <motion.line 
                    key={`linker-${id}-segment-${index}`} 
                    x1={segment.p1.x - minX} 
                    y1={segment.p1.y - minY} 
                    x2={segment.p2.x - minX} 
                    y2={segment.p2.y - minY} 
                    stroke="black"
                    strokeWidth="0.5"
                    className={classes.segment}
                />
            );
        }
        if (index === 0) { // Il segmento non è in testa.
            minX = maxX = segment.p1.x;
            minY = maxY = segment.p1.y;
            return (
                <motion.line 
                    key={`linker-${id}-segment-${index}`} 
                    x1={segment.p1.x} 
                    y1={segment.p1.y} 
                    x2={segment.p2.x} 
                    y2={segment.p2.y}
                    stroke="black"
                    strokeWidth="0.5"
                    className={classes.segment} 
                />
            );
        }
        if (index === segments.length - 1) { // Il segmento non è in coda, controlliamo il punto iniziale e finale.
            // p1
            if (segment.p1.x < minX) {
                minX = segment.p1.x;
            }
            if (segment.p1.x > maxX) {
                maxX = segment.p1.x;
            }
            if (segment.p1.y < minY) {
                minY = segment.p1.y;
            }
            if (segment.p1.y > maxY) {
                maxY = segment.p1.y;
            }
            // P2
            if (segment.p2.x < minX) {
                minX = segment.p2.x;
            }
            if (segment.p2.x > maxX) {
                maxX = segment.p2.x;
            }
            if (segment.p2.y < minY) {
                minY = segment.p2.y;
            }
            if (segment.p2.y > maxY) {
                maxY = segment.p2.y;
            }
            return (
                <motion.line 
                    key={`linker-${id}-segment-${index}`} 
                    x1={segment.p1.x} 
                    y1={segment.p1.y} 
                    x2={segment.p2.x} 
                    y2={segment.p2.y} 
                    stroke="black"
                    strokeWidth="0.5"
                    className={classes.segment}
                />
            );
        }
        // Il segmento è centrale, controlliamo solo p1.
        // p1
        if (segment.p1.x < minX) {
            minX = segment.p1.x;
        }
        if (segment.p1.x > maxX) {
            maxX = segment.p1.x;
        }
        if (segment.p1.y < minY) {
            minY = segment.p1.y;
        }
        if (segment.p1.y > maxY) {
            maxY = segment.p1.y;
        }
        return (
            <motion.line 
                key={`linker-${id}-segment-${index}`} 
                x1={segment.p1.x} 
                y1={segment.p1.y} 
                x2={segment.p2.x} 
                y2={segment.p2.y} 
                stroke="black"
                strokeWidth="0.5"
                className={classes.segment}
            />
        );
    });

    //console.log("Larghezze: " + minX + " " + maxX);
    //console.log("Altezze: " + minY + " " + maxY);

    return (
        <div
            id={`linker-${id}`}
            className={classes.linker}
            style={{
                top: minY,
                left: minX
            }}
        >
            {/* Input */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    width: maxX - minX,
                    height: maxY - minY
                }}
            >
                {generatedSegments}
            </svg>
        </div>
    );
});