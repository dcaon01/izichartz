'use client';

import classes from "./RenameProject.module.css";
import { useFormState } from "react-dom";
import { renameProject } from "@/lib/server-actions/manage";
import { motion } from "framer-motion";
import ErrorDisplayer from "@/components/authentication/ErrorDisplayer";
import FormButton from "@/components/utility/FormButton";
import RenameInput from "./RenameInput.js";

/**
 * DeleteProject
 * Componente che renderizza una finestra modale per l'eliminazione
 * di un nuovo progetto.
 * Si selezionerà semplicemente yes o no.
 * @refactor andare ad estrapolare un modale esterno che poi può essere riutilizzato?
 */
export default function RenameProject({ name, funct }) {
    let [state, formAction] = useFormState(renameProject, { messages: [] });

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
                    <h1>Rename Project</h1>
                    <div style={{ width: 300 }}>
                        {(state.messages.length > 0) && <ErrorDisplayer messages={state.messages} />}
                    </div>
                    <form action={formAction} className={classes.form}>
                        <RenameInput projectName={name} />
                        <input
                            id="renaming-project-prevName"
                            name="renaming-project-prevName"
                            type="text"
                            value={name}
                            className={`${classes.deletingText}`}
                            style={{ display: "none" }}
                            readOnly
                        />
                        <FormButton text="Rename" pendingText="Renaming..." onClick={funct}/>
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