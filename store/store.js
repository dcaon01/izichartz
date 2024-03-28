import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./design/global-slice";
import { elementsSlice } from "./design/elements-slice";

/**
 * makeStore
 * Funzionc che si occupa del setup dello store.
 * @returns un puntatore alla funzione configureStore, gestito da Redux.
 */
export default function makeStore() {
    return configureStore({
        reducer: {
            designGlobal: globalSlice.reducer,
            designElements: elementsSlice.reducer
        }
    })
}

/* Non ha senso generare uno slice per ogni componente, 
*  poiché non si riuscirebbe (o comunque sarebbe più complicato) ad aggiungerne (o tolierne) 
*  nel caso aggiungessimo (o togliessimo) elementi 
*/