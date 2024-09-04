'use client';

import classes from "./AuthInput.module.css";
import { useState } from "react";

/**
 * Input
 * Componente che va a rendereizzare un input. Esistono tre tipi di input (per ora):
 * - password
 * - email
 * - text
 * @param id valore dal dare all'id e al name dell'input.
 * @param type tipo di input.
 * @param label testo da inserire nella label.
 */
export default function AuthInput({ id, type, label }) {
    let isPassword = type === "password" ? true : false;
    let [isVisible, setIsVisible] = useState(false);

    /**
     * handlePswVisible1
     * funzione per la gestione della prima password.
     * @param event evento onClick.
     */
    function handlePswVisible(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isVisible) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }

    return (
        <div className={classes.inputWrapper}>
            {isPassword &&
                <div className={classes.passwordHead}>
                    <label>{label}</label>
                    <div className={classes.visible} onClick={handlePswVisible}>
                        <img src={isVisible ? "/assets/global/visible.png" : "/assets/global/not_visible.png"} height={16} width={16} alt={isVisible ? "hide" : "show"} />
                    </div>
                </div>
            }
            {!isPassword && 
                <label>{label}</label>
            }
            <input
                className={`${classes.input}`}
                type={isPassword ? (isVisible ? "text" : "password") : type}
                id={id}
                name={id}
                required
            />
        </div>
    );
}