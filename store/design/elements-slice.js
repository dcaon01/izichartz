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
            linked: [1, 2], // Id degli Elementi che devono essere collegati.
            segments: [       // Segmenti che compongono la linea. Il primo parte dal primo elemento, l'ultimo termina nel secondo
                {
                    p1: { x: 213.875, y: 235 },
                    p2: { x: 463.875, y: 335 },
                    selected: false,
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
        },

        /**
         * modifyElementOptionsAndLinkers
         * Reducer che si occupa della modifica degli elementi che possono avere dei linkers.
         * @param state stato corrente.
         * @param action  azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento.
         * - option: nome dell'opzione da modificare.
         * - value: valore con cui modificare quell'opzione.
         */
        modifyElementOptionsAndLinkers(state, action) {
            let element = state[action.payload.id - 1]; // Viene fatta una shallow copy.
            element.options[action.payload.option] = action.payload.value;
            // Cerchiamo i linkers fra gli elementi.
            state.forEach((linker) => {
                // Troviamo i linkers collegati all'elemento di cui è stato passato l'id. 
                // Se l'elemento è il primo in linked dobbiamo agire sul primo segment, altrimento sarà l'ultimo
                if (linker.type === "linker") {
                    if (linker.options.linked[0] === action.payload.id) {
                        linker.options.segments[0] = {
                            p1: {
                                x: element.options.position.x + (element.options.size.width / 2),
                                y: element.options.position.y + (element.options.size.height / 2),
                            },
                            p2: linker.options.segments[0].p2,
                        }
                    }
                    if (linker.options.linked[1] === action.payload.id) {
                        linker.options.segments[linker.options.segments.length - 1] = {
                            p1: linker.options.segments[linker.options.segments.length - 1].p1,
                            p2: {
                                x: element.options.position.x + (element.options.size.width / 2),
                                y: element.options.position.y + (element.options.size.height / 2),
                            },
                        }
                    }
                }
            });
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
                    if (element.type === "linker") {
                        element.options.segments.forEach((segment) => {
                            segment.selected = false;
                        });
                    }
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
         * 
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: identificativo del linker.
         * - index: indice che identifica il segment dell'indice da andare a selezionare.
         */
        setSelectedSegment(state, action) {
            const id = action.payload.id;
            console.log("Id dell'elemento da selezionare: " + id);
            if (id === 0) {
                state.forEach((element) => {
                    element.selected = false;
                });
            } else {
                state.forEach((element) => {
                    console.log("Entro nel foreach degli elementi");
                    if (element.id === id) {
                        console.log("Rilevo l'elemento che voglio selezionare");
                        element.selected = true;
                        element.options.segments.forEach((segment, index) => {
                            console.log("Entro nel foreach di segments")
                            if (action.payload.index === index) {
                                segment.selected = true;
                            } else {
                                segment.selected = false;
                            }
                        });
                    } else {
                        console.log("Elemento da deselezionare");
                        element.selected = false;
                        if (element.type === "linker") {
                            element.options.segments.forEach((segment) => {
                                segment.selected = false;
                            });
                        }
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
                    id: state.length + 1,
                    selected: false,
                    options: {
                        text: "",
                        linked: [startId + 1, finishId + 1], // Id degli Elementi che devono essere collegati.
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