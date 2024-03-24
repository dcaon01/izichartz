import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice globalSlice.
*  - selected: indica l'id numerico con cui identificare l'elemento selezionato.
*  Se è 0 allora nessun elemento del design è selezionato.
*/
const init = {
    selected: 0,
    // Mettere anche le dimensioni del documento?
}; 

/* globalSlice 
*  Slice che permette la gestione della logica generale dei moduli di design
*/
export const globalSlice = createSlice({
    name: "designGlobal",
    initialState: init,
    reducers: {
        /* selection 
        *  Reducer che si occupa del setting di selected.
        */
        selection(state, action) {
            state.selected = action.payload;
        }
    }
});