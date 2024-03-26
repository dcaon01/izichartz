import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./design/global-slice";
import { componentsSlice } from "./design/components-slice";

export default function makeStore() {
    return configureStore({
        reducer: {
            designGlobal: globalSlice.reducer,
            designComponents: componentsSlice.reducer
        }
    })
}

/* Non ha senso generare uno slice per ogni componente, 
*  poiché non si riuscirebbe (o comunque sarebbe più complicato) ad aggiungerne (o tolierne) 
*  nel caso aggiungessimo (o togliessimo) elementi 
*/