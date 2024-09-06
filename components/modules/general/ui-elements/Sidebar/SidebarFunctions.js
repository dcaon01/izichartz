import classes from "./SidebarFunctions.module.css";
import { motion } from "framer-motion";

export default function SidebarFunctions() {
    return (
        <motion.div 
            className={classes.sidebarFunctionsContainer} 
            initial={{
                opacity: 0,
                width: 0
            }}
            animate={{
                opacity: 1,
                width: "300px"
            }}
            exit={{
                opacity: 0,
                width: 0
            }}
        >

        </motion.div>
    );
}

