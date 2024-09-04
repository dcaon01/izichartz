import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice elementsSlice.
L'array contiene tutti i JSON che codificano gli elementi presenti nel
workpane. 
> Struttura dello Stato
{
    status: ["saved" | "tosave" | "noconnection"],
    selected: [],
    contextModule: true | false,
    sidebar: true, false,
    workpane: { heigth: , width: }
    zoom: 0.5-2 - Dove 2 è la visualizzazione massima
    elements: [  - Elementi che compongono il disegno
        {}
    ],
    errors: [] - array di errori
}

status, selected, contexModule e sidebar potrebbero essere comunque salvati con dei valori
"disattivati" in modo da non comparire al fetchin successivo del programma, ma comunque non dare problemi
per il resto.
*/

const init = {
    saved: false,
    elements: []
}

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
            console.log("Entro in add Element");
            let id = state.elements.length + 1;
            state.elements.push({ id: id, ...action.payload });
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
            state.elements[action.payload.id - 1].options[action.payload.option] = action.payload.value;
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
            let element = state.elements[action.payload.id - 1]; // Viene fatta una shallow copy.
            element.options[action.payload.option] = action.payload.value;
            // Cerchiamo i linkers fra gli elementi.
            state.elements.forEach((linker) => {
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
            console.log("Stampiamo gli elementi: " + state.elements);
            if (id === 0) {
                state.elements.forEach((element) => {
                    element.selected = false;
                    if (element.type === "linker") {
                        element.options.segments.forEach((segment) => {
                            segment.selected = false;
                        });
                    }
                });
            } else {
                state.elements.forEach((element) => {
                    if (element.id === id) {
                        element.selected = true;
                    } else {
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
         * 
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: identificativo del linker.
         * - index: indice che identifica il segment dell'indice da andare a selezionare.
         */
        setSelectedSegment(state, action) {
            const id = action.payload.id;
            if (id === 0) {
                state.elements.forEach((element) => {
                    element.selected = false;
                });
            } else {
                state.elements.forEach((element) => {
                    if (element.id === id) {
                        element.selected = true;
                        element.options.segments.forEach((segment, index) => {
                            if (action.payload.index === index) {
                                segment.selected = true;
                            } else {
                                segment.selected = false;
                            }
                        });
                    } else {
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
                state.elements.forEach((element) => {
                    // element.selected = false;
                    if (element.options.connecting) {
                        element.options.connecting = false;
                    }
                });
            } else {
                state.elements.forEach((element) => {
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
            state.elements.forEach((element) => {
                if (element.options && element.options.connecting === true) {
                    startId = element.id;
                }
            });
            if (startId !== 0 && startId !== finishId) {
                startId--;
                finishId--;
                const p1 = {
                    x: state.elements[startId].options.position.x + (state.elements[startId].options.size.width / 2),
                    y: state.elements[startId].options.position.y + (state.elements[startId].options.size.height / 2),
                }
                const p2 = {
                    x: state.elements[finishId].options.position.x + (state.elements[finishId].options.size.width / 2),
                    y: state.elements[finishId].options.position.y + (state.elements[finishId].options.size.height / 2),
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
                state.elements.push(linker);
            } else {
                console.log("Non puoi connettere lo stesso elemento");
            }
        }
    }
});