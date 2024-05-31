import classes from "./DesktopModulesDropdown.module.css";
import Link from "next/link";
import { robotoMono } from "@/app/fonts";
import { motion } from "framer-motion";

export default function DesktopModulesDropdown() {
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
            <Link className={`${classes.link} ${robotoMono.className}`} href=""> - Entity-Relationship</Link>
        </motion.div>
    );
}
