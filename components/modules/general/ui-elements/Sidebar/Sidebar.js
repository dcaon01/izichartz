'use client'

import classes from "./Sidebar.module.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SidebarFunctions from "./SidebarFunctions";
import SidebarRenderButton from "./SidebarRenderButton";

export default function Sidebar() {
    let [render, setRender] = useState(true);

    function handleRender() {
        if(render) {
            setRender(false);
        } else {
            setRender(true);
        }
    }

    return (
        <div className={classes.sidebarContainer}>
            <SidebarRenderButton onClick={handleRender}/>
            <AnimatePresence>
                {render && <SidebarFunctions />}
            </AnimatePresence>
        </div>
    );
}

