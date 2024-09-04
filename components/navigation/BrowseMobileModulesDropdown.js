import classes from "./MobileModulesDropdown.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MobileModulesDropdown({ handler }) {
    return (
        <motion.div
            className={classes.modulesDropdown}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
        >
            <Link className={`${classes.link}`} onClick={handler} href=""> - Entity-Relationship</Link>
        </motion.div>
    );
}