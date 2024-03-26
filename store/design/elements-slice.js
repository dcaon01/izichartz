import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice componentsSlice.
* L'array contiene tutti i JSON che codificano gli elementi presenti nel
* workpane.
*/
const init = [
    {
        type: "Entity",
        id: 1,
        options: {
            text: "Ciao",
            position: {
                x: 150, 
                y: 200,
            },
        }
    },
];

/* Creiamo uno slice che memorizza gli elementi grafici che ci sono all'interno di
*  un workpane come oggetti all'interno dell'array presente nello slice stesso.
*/
export const elementsSlice = createSlice({
    name: "designElements",
    initialState: init,
    reducers: {
        addElement() {
        },

        removeElement() {

        },

        /* modifyComponent 
        *  Reducer che permette di modificare un elemento.
        *  Nel payload inseriamo:
        *  - id: id dell'elemento.
        *  - option: nome dell'opzione da modificare.
        *  - value: valore con cui modificare quell'opzione
        */
        modifyOptionsElement(state, action) {
            state[action.payload.id - 1].options[action.payload.option] = action.payload.value;
        }
    }
});