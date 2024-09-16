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
    // Oggetto per il download
    const download = (filename, content) => {
        var element = document.createElement("a");
        element.setAttribute("href", content);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    async function handleSave(event) {
        event.preventDefault();
        // Usare html2canvas
        const workpane = document.getElementById('view');
        const canva = await html2canvas(workpane, {
            onclone: (document) => {
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => {
                    input.style.padding = window.getComputedStyle(input).padding;
                    input.style.margin = window.getComputedStyle(input).margin;
                    input.style.height = window.getComputedStyle(input).height;
                    input.style.width = window.getComputedStyle(input).width;
                });
            }
        });
        const imgData = canva.toDataURL('image/png');
        dispatch(saveProject({ id: id, content: state, preview: imgData }));
    }

    async function handleDownload() {
        const result = await fetch(`/previews/${id}.png`, {
            method: "GET",
            headers: {}
        });
        const blob = await result.blob();
        const url = URL.createObjectURL(blob);
        download(`${id}.png`, url);
        URL.revokeObjectURL(url);
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
            <p className={`${classes.link}`} onClick={handleDownload}>
                Export
            </p>
        </motion.div>
    );
}