import classes from "./FileDropdown.module.css";
import { robotoMono } from "@/app/fonts";
import { motion } from "framer-motion";
import { saveProject } from "@/store/design/elements-slice";
import { useDispatch } from "react-redux";

/**
 * Filedropdown
 * Componente per la renderizzazione di un menu di dropdown.
 * @param state stato del progetto.
 */
export default function FileDropdown({id, state}) {
    const dispatch = useDispatch();

    function handleSave(event) {
        event.preventDefault();
        dispatch(saveProject({ id: id, content: state} ));
    }

    return (
        <motion.div
            className={classes.modulesDropdown}
            initial={{
                top: 70,
                opacity: 0,
            }}
            animate={{
                top: 50,
                opacity: 1,
            }}
            exit={{
                top: 70,
                opacity: 0,
            }}
        >
            <p className={`${classes.link} ${robotoMono.className}`} onClick={handleSave}>Save</p>
            <p className={`${classes.link} ${robotoMono.className}`}>Export</p>
        </motion.div>
    );
}