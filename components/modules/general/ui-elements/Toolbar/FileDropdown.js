import classes from "./FileDropdown.module.css";
import { motion } from "framer-motion";
import { saveProject } from "@/store/design/elements-slice";
import { useDispatch } from "react-redux";
import html2canvas from "html2canvas";

/**
 * Filedropdown
 * Componente per la renderizzazione di un menu di dropdown.
 * @param state stato del progetto.
 */
export default function FileDropdown({ id, state }) {
    const dispatch = useDispatch();

    async function handleSave(event) {
        event.preventDefault();
        // Usare html2canvas
        const workpane = document.getElementById('view');
        const canva = await html2canvas(workpane);
        const imgData = canva.toDataURL('image/png');
        dispatch(saveProject({ id: id, content: state, preview: imgData }));
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
            <p className={`${classes.link}`} onClick={handleSave}>Save</p>
            <a className={`${classes.link}`} href={`/previews/${id}.png`} download={`immagine.png`}>
                Export
            </a>
        </motion.div>
    );
}