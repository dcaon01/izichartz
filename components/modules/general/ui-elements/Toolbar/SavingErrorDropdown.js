import { motion } from "framer-motion";
import classes from "./SavingErrorDropdown.module.css";

export default function SavingErrorDropdown() {
    return (
        <motion.div 
            className={classes.savingErrorDropdown}
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
            <p className={classes.errorText}>Warning: the project could not be saved</p>
        </motion.div>
    );
}

