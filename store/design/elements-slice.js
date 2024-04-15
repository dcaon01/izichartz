import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice componentsSlice.
L'array contiene tutti i JSON che codificano gli elementi presenti nel
workpane. */
const init = [
    {
        type: "entity",
        id: 1,
        selected: false,
        options: {
            text: { value: "ENTITY1", width: 49.5 },
            position: {
                x: 150,
                y: 200,
            },
            minSize: 70,
            size: {
                width: 127.75,
                height: 70,
            },
            connecting: false,
        }
    },
    {
        type: "entity",
        id: 2,
        selected: false,
        options: {
            text: { value: "ENTITY2", width: 49.5 },
            position: {
                x: 400,
                y: 300,
            },
            minSize: 70,
            size: {
                width: 127.75,
                height: 70,
            },
            connecting: false,
        },
    },
    {
        type: "relationship",
        id: 3,
        selected: false,
        options: {
            text: { value: "", width: 0 },
            position: {
                x: 600,
                y: 150,
            },
            minSize: 80,
            size: {
                width: 80,
                height: 80,
            },
            connecting: false
        },
    },
    {
        type: "linker",
        id: 4,
        selected: false,
        options: {
            text: "",
            linked: [1, 0], // Id degli Elementi che devono essere collegati.
            segments: [       // Segmenti che compongono la linea. Il primo parte dal primo elemento, l'ultimo termina nel secondo
                {
                    p1: { x: 463.875, y: 335 },
                    p2: { x: 213.875, y: 235 }
                }
            ],
        }
    }
];

/* Creiamo uno slice che memorizza gli elementi grafici che ci sono all'interno di
un workpane come oggetti all'interno dell'array presente nello slice stesso.*/
export const elementsSlice = createSlice({
    name: "designElements",
    initialState: init,
    reducers: {
        /**
         * addElement
         * Reducer che si occupa dell'aggiunta di un elemento. 
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - element: elemento da inserire all'interno dell'array degli elementi.
         *  Il JSON dovrà avere tutti gli elementi tranne l'id.
         */
        addElement(state, action) {
            let id = state.length;
            state.push({ id: id, ...action.payload });
        },

        /**
         * removeElement
         * Reducer che si occupa dell'eliminazione di un elemento.
         * @param id identificatore dell'elemento da eliminare.
         */
        removeElement() {
        },

        /**
         * modifyOptionElement
         * Reducer che si occupa della modifica di una opzione di un determinato elemento.
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento.
         * - option: nome dell'opzione da modificare.
         * - value: valore con cui modificare quell'opzione.
         */
        modifyElementOptions(state, action) {
            state[action.payload.id - 1].options[action.payload.option] = action.payload.value;
            if(state[action.payload.id - 1].type !== "linker") {
                // Prelevare il linker, e in particolare 
            }
        },

        /**
         * setSelectedElements
         * Reducer che si occupa del setting della selezione.
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento da selezionare. Se 0, imposta tutti gli elementi come non selezionati.
         */
        setSelectedElement(state, action) {
            const id = action.payload;
            if (id === 0) {
                state.forEach((element) => {
                    element.selected = false;
                });
            } else {
                state.forEach((element) => {
                    if (element.id === id) {
                        element.selected = true;
                    } else {
                        element.selected = false;
                    }
                });
            }
        },

        /**
         * setConnectionElement
         * Reducer che si occupa del setting della connessione.
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento da settare come "in connessione". Se 0, imposta tutti gli elementi come non "in connessione".
         */
        setConnectingElement(state, action) {
            const id = action.payload;
            if (id === 0) {
                state.forEach((element) => {
                    // element.selected = false;
                    if (element.options.connecting) {
                        element.options.connecting = false;
                    }
                });
            } else {
                state.forEach((element) => {
                    if (element.id === id) {
                        element.options.connecting = true;
                    } else {
                        element.options.connecting = false;
                    }
                });
            }
        },

        /**
         * connecting
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elememnto che sta cercando di fare la connessione.
         */
        connecting(state, action) {
            let startId = 0;
            let finishId = action.payload;
            state.forEach((element) => {
                if (element.options && element.options.connecting === true) {
                    startId = element.id;
                }
            });
            if (startId !== 0 && startId !== finishId) {
                console.log("connecting");
                startId--;
                finishId--;
                const p1 = {
                    x: state[startId].options.position.x + (state[startId].options.size.width / 2),
                    y: state[startId].options.position.y + (state[startId].options.size.height / 2),
                }
                const p2 = {
                    x: state[finishId].options.position.x + (state[finishId].options.size.width / 2),
                    y: state[finishId].options.position.y + (state[finishId].options.size.height / 2),
                }
                const linker = {
                    type: "linker",
                    id: state.length,
                    selected: false,
                    options: {
                        text: "",
                        linked: [startId, finishId], // Id degli Elementi che devono essere collegati.
                        segments: [       // Segmenti che compongono la linea. Il primo parte dal primo elemento, l'ultimo termina nel secondo
                            {
                                p1: p1,
                                p2: p2
                            }
                        ],
                    }
                }
                state.push(linker);
            } else {
                console.log("Non puoi connettere lo stesso elemento");
            }
        }
    }
});