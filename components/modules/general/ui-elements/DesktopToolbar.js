'use client'

import { lazy, Suspense, useState } from "react";
import classes from "./DesktopToolbar.module.css";
const ProjectName = lazy(() => import("./ProjectName"));
import LoadingItem from "@/components/loading/LoadingItem";
import { robotoMono } from "@/app/fonts";
import { motion, AnimatePresence } from "framer-motion";
import FileDropdown from './FileDropdown';
import UndoRedo from "./UndoRedo";
import Zoom from "./Zoom";

export default function DesktopToolbar({ projectName }) {
    let [modulesDropDown, setModulesDropDown] = useState(false);

    function handleModulesDropDown(event) {
        event.preventDefault();
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    return (
        <nav className={classes.toolbar}>
            <Suspense fallback={
                <LoadingItem text={null} />
            }>
                <ProjectName name={projectName} />
                <div className={classes.modulesSelector} onClick={handleModulesDropDown}>
                    <p className={`${classes.modulesSelectorText} ${robotoMono.className}`} style={{ marginRight: 5 }}>File</p>
                    <motion.svg height={10} width={10} xmlns="http://www.w3.org/2000/svg" animate={{ transform: `rotate(${modulesDropDown ? 180 : 0}deg)` }} >
                        <polygon points="0,0 10,0 5,10" className={classes.modulesSelectorArrow} />
                    </motion.svg>
                    <AnimatePresence>
                        {modulesDropDown &&
                            <FileDropdown />
                        }
                    </AnimatePresence>
                </div>
                <UndoRedo />
                <Zoom />
            </Suspense>
        </nav>
    );
}

