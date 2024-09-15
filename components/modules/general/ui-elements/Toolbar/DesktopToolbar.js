'use client'

import { lazy, useState } from "react";
import classes from "./DesktopToolbar.module.css";
const ProjectName = lazy(() => import("./ProjectName"));
import { robotoMono } from "@/app/fonts";
import { motion, AnimatePresence } from "framer-motion";
import FileDropdown from './FileDropdown';
import SavingStatus from "./SavingStatus";
import { useSelector } from "react-redux";

export default function DesktopToolbar({ projectName, id }) {
    let [modulesDropDown, setModulesDropDown] = useState(false);
    const state = useSelector(state => state.designElements);
    console.log(JSON.stringify(state));

    function handleModulesDropDown(event) {
        event.preventDefault();
        event.stopPropagation();
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    function handleSelection(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <nav className={classes.toolbar}>
            <>
                <ProjectName name={projectName} />
                <div className={classes.modulesSelector} onClick={handleModulesDropDown} onDoubleClick={handleSelection}>
                    <p className={`${classes.modulesSelectorText} ${robotoMono.className}`} style={{ marginRight: 5, paddingTop: 2 }}>File</p>
                    <motion.svg height={10} width={10} xmlns="http://www.w3.org/2000/svg" animate={{ transform: `rotate(${modulesDropDown ? 180 : 0}deg)` }} >
                        <polygon points="0,0 10,0 5,10" className={classes.modulesSelectorArrow} />
                    </motion.svg>
                    <AnimatePresence>
                        {modulesDropDown &&
                            <FileDropdown state={state} id={id} />
                        }
                    </AnimatePresence>
                </div>
                <SavingStatus status={state.status}/>
            </>
        </nav>
    );
}

