import { configureStore } from "@reduxjs/toolkit";
import { elementsSlice } from "./elements-slice";

/**
 * makeStore
 * Funzione che si occupa del setup dello store.
 * @returns un puntatore alla funzione configureStore, gestito da Redux.
 */
export default function makeStore(content) {

    // Richiedi di creare lo store
    return configureStore({
        reducer: {
            designElements: elementsSlice.reducer
        },
        preloadedState: {
            designElements: content
        }
    });
}

/** 
 * 
 */