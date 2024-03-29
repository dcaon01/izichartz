import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice componentsSlice.
L'array contiene tutti i JSON che codificano gli elementi presenti nel
workpane. */
const init = [
    {
        type: "Entity",
        id: 1,
        options: {
            text: "ENTITY1",
            position: {
                x: 150, 
                y: 200,
            },
        }
    },
    {
        type: "Entity",
        id: 2,
        options: {
            text: "ENTITY2",
            position: {
                x: 400, 
                y: 300,
            },
        }
    },
    {   
        type: "Relationship",
        id: 3,
        options: {
            text: "RELATIONSHIP1",
            position: {
                x: 600, 
                y: 150,
            }
        }
    }

];

/* Creiamo uno slice che memorizza gli elementi grafici che ci sono all'interno di
un workpane come oggetti all'interno dell'array presente nello slice stesso.*/
export const elementsSlice = createSlice({
    name: "designElements",
    initialState: init,
    reducers: {
        addElement() {
        },

        removeElement() {
        },

        /**
         * modifyOptionElement
         * Reducer che si occupa della modifica di una opzione di un determinato elemento.
         * @param state: stato corrente.
         * @param action: azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento.
         * - option: nome dell'opzione da modificare.
         *  - value: valore con cui modificare quell'opzione.
         */
        modifyOptionElement(state, action) {
            state[action.payload.id - 1].options[action.payload.option] = action.payload.value;
        }
    }
});