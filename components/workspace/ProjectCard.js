'use client'

import { robotoMono } from "@/app/fonts";
import classes from "./ProjectCard.module.css";
import { motion } from "framer-motion";

export default function ProjectCard({ name, module, creation, preview }) {
    return (
        <motion.div 
            className={classes.card}
            style={{
                y: 0
            }}
            whileHover={{
                y: -5,
                boxShadow: '0 5px 4px rgba(0, 0, 0, 0.2)'
            }}
        >
            <div>
                {/* Immagine className={classes.preview} */}
                <img src={preview} height={200} width={200} style={{}}/>
            </div>
            <div className={classes.info}>
                <p className={robotoMono.className}>{name}</p>
                <p className={robotoMono.className} style={{fontSize: 12}}>{module}</p>
                <p className={robotoMono.className} style={{fontSize: 12}}>{creation}</p>
            </div>
        </motion.div>
    );
}
