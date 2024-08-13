import { motion } from "framer-motion";

/**
 * 
 * @param funct funzione che vogliamo che sia richiamata 
 * una volta cliccato su di esso, in base al componente padre
 * che lo triggera.
 */
export default function BlackOpaqueBackground({ funct }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                top: "0px",
                left: "0px",
                zIndex: 9,
                backgroundColor: "black"
            }}
            onClick={funct}
        />
    );
};