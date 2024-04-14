import { motion } from "framer-motion";

export default function ({ id, width, height, selected, connecting }) {
    return (
        <svg
            style={{
                height: height,
                width: width,
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {connecting &&
                <motion.polygon
                    id={`connect-relationship-${id}`}
                    fill="transparent"
                    stroke="black"
                    strokeWidth="2,5"
                    style={{ zIndex: 1 }}
                    initial={{
                        points: `8,${height / 2} ${width / 2},${height - 8} ${(width - 2)},${height / 2} ${width / 2},8`
                    }}
                    animate={{
                        points: `2,${height / 2} ${width / 2},${height - 2} ${(width - 2)},${height / 2} ${width / 2},2`
                    }}
                    transition={{ duration: 0.1 }}
                />
            }
            <motion.polygon
                id={`body-relationship-${id}`}
                points={`8,${height / 2} ${width / 2},${height - 8} ${(width - 8)},${height / 2} ${width / 2},8`}
                fill="white"
                stroke="black"
                animate={{ strokeWidth: selected ? "2.5px" : "0.5px" }}
                transition={{ duration: 0.1 }}
            // Al poligon non si possono assegnare cursori
            />
        </svg>
    );
};