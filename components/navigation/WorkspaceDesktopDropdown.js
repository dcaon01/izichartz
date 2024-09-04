import classes from "./DesktopModulesDropdown.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { userLogout } from "@/lib/server-actions/auth";

export default function WorkspaceDesktopDropdown() {

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
            <Link className={`${classes.link}`} href="">Manage</Link>
            <form action={userLogout}>
                <button className={`${classes.link}`} type="submit">Logout</button>
            </form>
        </motion.div>
    );
}