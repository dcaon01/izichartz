import classes from "./MobileModulesDropdown.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { userLogout } from "@/lib/server-actions/auth";

export default function WorkspaceMobileDropdown({ handler }) {
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
            <Link className={`${classes.link}`} href="" onClick={handler}>Manage</Link>
            <form action={userLogout}>
                <button className={`${classes.link}`} type="submit" onClick={handler}>Logout</button>
            </form>
        </motion.div>
    );
};