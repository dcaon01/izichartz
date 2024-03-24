import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice componentsSlice.
* L'array contiene tutti i JSON che codificano gli elementi presenti nel
* workpane.
*/
const init = [];

/* Creiamo uno slice che memorizza gli elementi grafici che ci sono all'interno di
*  un workpane come oggetti all'interno dell'array presente nello slice stesso.
*/
export const componentsSlice = createSlice({
    name: "designComponents",
    initialState: init,
    reducers: {
        addComponent() {
        },
        removeComponent() {

        },

        modifyComponent() {

        }
    }
});