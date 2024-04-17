'use-client';

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { elementsSlice } from "@/store/design/elements-slice";

/**
 * Segment
 * Componente che renderizza una parte di un linker, per l'appunto un segmento.
 * @param id identificativo dell'elemento linker.
 * @param index posto all'interno dell'array dei segments, utile per renderizzare i dragging points.
 * @param x1 coordinata x del primo punto.
 * @param y1 coordinata y del primo punto.
 * @param x2 coordinata x del secondo punto.
 * @param y2 coordinata y del secondo punto.
 */
export default function Segment({ id, index, x1, y1, x2, y2, selected }) {
    /* Elementi di utility */
    let curs = "pointer" // Selettore del pointer.
    const dispatch = useDispatch();

    console.log(id);

    function handleSelection(event) {
        event.stopPropagation();
        dispatch(elementsSlice.actions.setSelectedSegment({id, index}));
    }

    return (
        <>
            <motion.line
                key={`linker-${id}-segment-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                initial={{
                    strokeWidth: 0,
                }}
                animate={{
                    strokeWidth: selected ? 2.5 : 0.5,
                }}
                transition={{ duration: 0.2 }}
            />
            <line
                key={`linker-${id}-segment-selector-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="transparent"
                strokeWidth="10"
                style={{
                    cursor: curs,
                }}
                onClick={handleSelection}
            />
        </>
    );
};