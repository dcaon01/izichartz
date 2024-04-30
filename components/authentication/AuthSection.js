'use client';

import classes from "./AuthSection.module.css";
import { motion } from "framer-motion";

/**
 * AuthSection
 * Componente che renderizza la sezione di autenticazione comune a login register.
 * @param children essendo una sezione "di layout", la settiamo in modo che possa ricevere
 * dei children condizionalemente in base alla pagina di registrazione o accesso.
 */
export default function AuthSection({children}) {
    return (
        <div className={classes.authWrapper}>
            <motion.div 
                className={classes.authContainer}
                style={{
                    padding: 40
                }}
                whileHover={{
                    padding: 50
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};