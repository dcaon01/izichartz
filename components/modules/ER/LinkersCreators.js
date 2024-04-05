'use client';

import { useDispatch } from "react-redux";
import classes from "./LinkersCreators.module.css";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { elementsSlice } from "@/store/design/elements-slice";
import { motion } from 'framer-motion';


/**
 * LinkersCreators
 * Componente che renderizza dei cerchi quando un elemento è selezionato in modo da offrire
 * degli access point per la creazione di linkers.
 * @param width larghezza dell'svg che contiene i cerchi.
 * @param height altezza dell'svg che contiene i cerchi. 
 */
export default function LinkersCreators({ width, height }) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "absolute",
                height: height,
                width: width
            }}
        >
            <motion.circle
                id="right"
                r="4"
                cy={height / 2}
                fill="black"
                initial={{
                    cx: width - 10,
                    opacity: 0,
                }}
                animate={{
                    cx: width - 5,
                    opacity: 1,
                }}
                className={classes.creatorHorizontal}
            />
            <motion.circle
                id="top"
                r="4"
                cx={width / 2}
                fill="black"
                initial={{
                    cy: 10,
                    opacity: 0,
                }}
                animate={{
                    cy: 5,
                    opacity: 1,
                }}
                className={classes.creatorVertical}
            />
            <motion.circle
                id="left"
                r="4"
                cy={height / 2}
                fill="black"
                initial={{
                    cx: 10,
                    opacity: 0,
                }}
                animate={{
                    cx: 5,
                    opacity: 1,
                }}
                className={classes.creatorHorizontal}
            />
            <motion.circle
                id="bottom"
                r="4"
                cx={width / 2}
                fill="black"
                initial={{
                    cy: height - 10,
                    opacity: 0,
                }}
                animate={{
                    cy: height - 5,
                    opacity: 1,
                }}
                className={classes.creatorVertical}
            />
        </svg>
    );
};