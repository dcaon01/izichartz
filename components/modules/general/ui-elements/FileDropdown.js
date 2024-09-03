import classes from "./FileDropdown.module.css";
import { robotoMono } from "@/app/fonts";
import { motion } from "framer-motion";

export default function FileDropdown() {

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
            <form>
                <button className={`${classes.link} ${robotoMono.className}`} href="">Save</button>
            </form>
            <form>
                <button className={`${classes.link} ${robotoMono.className}`} type="submit">Export</button>
            </form>
        </motion.div>
    );
}