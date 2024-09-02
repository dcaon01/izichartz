'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * OnScrollWrapper
 * Componente wrapper che fa in modo che i suoi children 
 * siano animati on scroll con una dissolvenza in entrata 
 * nella direzione indicata da direction
 * @param children
 * @param direction 
 */
export default function OnScrollWrapper({ children, direction, intensity, size}) {
    let x = 0;
    let y = 0;
    const descriptionRef = useRef(null);
    const isInView = useInView(descriptionRef, {
        once: true,
    });

    if (direction === "up") {
        y = intensity;
    } else if (direction === "down") {
        y = -intensity;
    } else if (direction === "left") {
        x = intensity;
    } else if (direction === "right") {
        x = -intensity;
    }

    return (
        <motion.div
            ref={descriptionRef}
            initial={{
                opacity: 0,
                x: x,
                y: y
            }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                duration: 0.5
            }}
            style={{
                width: `${size}%`
            }}
        >
            {children}
        </motion.div>
    );
}

