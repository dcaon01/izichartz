'use client'

import { robotoMono } from "@/app/fonts";
import classes from "./ProjectCard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ name, module, creation, preview }) {
    let [isHover, setIsHover] = useState(false);

    function setIsHoverTrue() {
        setIsHover(true);
    }

    function setIsHoverFalse() {
        setIsHover(false);
    }

    return (
        <>
            <motion.div
                className={classes.card}
                onHoverStart={setIsHoverTrue}
                onHoverEnd={setIsHoverFalse}
                style={{
                    y: 0
                }}
                whileHover={{
                    y: -5,
                    boxShadow: '0 5px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                <AnimatePresence />
                {isHover
                    ?
                    <motion.div 
                        className={classes.tooltip}
                        initial={{
                            opacity: 0,
                            top: -40
                        }}
                        animate={{
                            opacity: 1,
                            top: -30
                        }}
                    >
                        <p className={`${robotoMono.className}`} >Click to edit</p>
                    </motion.div>
                    :
                    null
                }
                <AnimatePresence />
                <div>
                    <motion.img
                        src="/assets/global/pen.png"
                        width={17}
                        height={17}
                        className={`${classes.actionImage} ${classes.modifyImage}`}
                        style={{
                            opacity: isHover ? 1 : 0,
                            display: isHover ? "block" : "none"
                        }}
                        animate={{
                            opacity: isHover ? 1 : 0,
                        }}
                    />
                    <motion.img
                        src="/assets/global/crossed-menu.png"
                        width={20}
                        height={20}
                        className={`${classes.actionImage} ${classes.eliminateImage}`}
                        style={{
                            display: isHover ? "block" : "none"
                        }}
                        animate={{
                            opacity: isHover ? 1 : 0,
                        }}
                    />
                    {/* Immagine className={classes.preview} */}
                    <img src={preview} height={200} width={200} style={{}} />
                </div>
                <div className={classes.info}>
                    <p className={robotoMono.className}>{name}</p>
                    <p className={robotoMono.className} style={{ fontSize: 12 }}>{module}</p>
                    <p className={robotoMono.className} style={{ fontSize: 12 }}>{creation}</p>
                </div>
            </motion.div>
        </>
    );
}
