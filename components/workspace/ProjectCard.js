'use client'

import { robotoMono } from "@/app/fonts";
import classes from "./ProjectCard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DeleteProject from "@/components/workspace/DeleteProject";
import RenameProject from "@/components/workspace/RenameProject";

export default function ProjectCard({ name, module, creation, preview }) {
    let [isHover, setIsHover] = useState(false);
    let [tooltipText, setTooltipText] = useState("");
    let [isDeleting, setIsDeleting] = useState(false);
    let [isRenaming, setIsRenaming] = useState(false);

    function setIsHoverTrue() {
        setIsHover(true);
        setTooltipText("Click to Edit");
    }

    function setIsHoverFalse() {
        setIsHover(false);
        setTooltipText("");
    }

    function setHoverTooltip(event) {
        if(event.target.id === "rename-project-tooltip") {
            setTooltipText("Click to Rename");
        }
        if (event.target.id === "delete-project-tooltip") {
            setTooltipText("Click to Delete");
        }
    }
    
    function deleteProject(event) {
        event.preventDefault();
        if (isDeleting) {
            setIsDeleting(false);
        } else {
            setIsDeleting(true);
        }
    }

    function renameProject(event) {
        event.stopPropagation();
        if (isRenaming) {
            setIsRenaming(false);
        } else {
            setIsRenaming(true);
        }
    }

    return (
        <>
            {/* Renderizziamo i due modali */}
            {isDeleting && <DeleteProject name={name} funct={deleteProject}/>}
            {isRenaming && <RenameProject name={name} funct={renameProject}/>}
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
                        <p className={`${robotoMono.className}`} >{tooltipText}</p>
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
                        onHoverStart={setHoverTooltip}
                        onHoverEnd={setIsHoverTrue}
                        id="rename-project-tooltip"
                        onClick={renameProject}
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
                        onHoverStart={setHoverTooltip}
                        onHoverEnd={setIsHoverTrue}
                        id="delete-project-tooltip"
                        onClick={deleteProject}
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
