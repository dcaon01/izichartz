'use client'

import { motion } from "framer-motion";
import classes from "./SidebarRenderButton.module.css"
import { useState } from "react";

export default function SidebarRenderButton({ onClick }) {
    let [opened, setOpened] = useState(true);
    let [hover, setHover] = useState(false);
    let imgName = "";

    if (hover) {
        imgName = "arrow-black.png"
    } else {
        imgName = "arrow-white.png"
    }

    function handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (opened) {
            setOpened(false);
        } else {
            setOpened(true);
        }
        onClick();
    }

    function handleHover(event) {
        event.preventDefault();
        event.stopPropagation();
        setHover(true);
    }

    function handleHoverEnd(event) {
        event.preventDefault();
        event.stopPropagation();
        setHover(false);
    }

    return (
        <div
            className={classes.sidebarButton}
            onClick={handleClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverEnd}
        >
            <motion.img src={`/assets/design/${imgName}`} heigth={30} width={30} animate={{ transform: `rotate(${opened ? 180 : 0}deg)`, x: opened ? -100 : 0 }} />
        </div>
    );
}

