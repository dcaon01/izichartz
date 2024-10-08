'use client';

import classes from "./NewProject.module.css";
import AuthInput from "../authentication/AuthInput";
import { useFormState } from "react-dom";
import { createProject } from "@/lib/server-actions/manage";
import { motion } from "framer-motion";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import FormButton from "@/components/utility/FormButton";

/**
 * NewProject
 * Componente che renderizza una finestra modale per la creazione
 * di un nuovo progetto.
 * Si selezionerà semplicemente il nome e il tipo di modulo.
 * @refactor andare ad estrapolare un modale esterno che poi può essere riutilizzato?
 */
export default function NewProject({ funct }) {
    let [state, formAction] = useFormState(createProject, { messages: [] });

    function handleFormClick(event) {
        event.stopPropagation();
    }

    return (
        <>
            <div className={classes.modal}
                onClick={funct}
            >
                <motion.div
                    style={{
                        padding: 40
                    }}
                    whileHover={{
                        padding: 50
                    }}
                    className={classes.formContainer}
                    onClick={handleFormClick}
                >
                    <div className={classes.crossContainer}>
                        <img src="/assets/global/crossed-menu.png" className={classes.cross} onClick={funct} />
                    </div>
                    <h1>New Project</h1>
                    <div style={{ width: 300 }}>
                        {state.messages.length > 0 && <ErrorDisplayer messages={state.messages} />}
                    </div>
                    <form action={formAction} className={classes.form}>
                        {/* Da generalizzare, ma per ora va bene */}
                        <AuthInput id="project-name" type="text" label="Insert Project Name" />
                        <div className={classes.selection}>
                            <label>Select Module</label>
                            <select id="project-module" name="project-module" className={classes.selector}>
                                <option value="-" selected>-</option>
                                <option value="entity-relationship">Entity-Relationship</option>
                            </select>
                        </div>
                        <div className={classes.selection}>
                            <label>Select Size</label>
                            <select id="project-size" name="project-size" className={classes.selector}>
                                <option value="-" selected>-</option>
                                <option value='{ "width": 1920, "height": 1080 }'>1920x1080</option>
                            </select>
                        </div>
                        <FormButton text="Create" pendingText="Creating..." />
                    </form>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    zIndex: 12,
                    backgroundColor: "black"
                }}
            />
        </>
    );
}

