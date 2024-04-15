import { motion } from "framer-motion";

export default function ({ id, width, height, selected, connecting }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                height: height,
                width: width,
            }}
        >
            {connecting &&
                <motion.rect
                    id={`connect-entity-${id}`}
                    x="4"
                    y="4"
                    rx="5"
                    ry="5"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                    style={{
                        zIndex: 2,
                    }}
                    initial={{
                        height: height - 14,
                        width: width - 14,
                    }}
                    animate={{
                        height: height - 8,
                        width: width - 8,
                    }}
                    transition={{ duration: 0.1 }}
                />
            }
            {/* Rettangolo che costituisce l'area dell'entità*/}
            <motion.rect
                id={`body-entity-${id}`}
                height={height - 14.5}
                width={width - 14.5}
                x="7"
                y="7"
                rx="5"
                ry="5"
                fill="white"
                stroke="black"
                animate={{
                    zIndex: 3,
                    strokeWidth: selected ? "2.5px" : "0.7px",
                }}
                transition={{ duration: 0.1 }}
            />
        </svg>
    );
}