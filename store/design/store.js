import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./global-slice";
import { elementsSlice } from "./elements-slice";

/**
 * makeStore
 * Funzione che si occupa del setup dello store.
 * @returns un puntatore alla funzione configureStore, gestito da Redux.
 */
export default function makeStore(content) {
    console.log("Stampiamo nel makeStore: " + content);

    // Richiedi di creare lo store
    return configureStore({
        reducer: {
            designGlobal: globalSlice.reducer,
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