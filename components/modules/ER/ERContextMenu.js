import ContextMenu from "@/components/modules/general/ui-elements/ContextMenu/ContextMenu";
import ContextMenuOption from "@/components/modules/general/ui-elements/ContextMenu/ContextMenuOption";
import { useDispatch, useSelector } from "react-redux";
import { elementsSlice } from "@/store/design/elements-slice";

/**
 * ERContextMenu
 * Componente che "estende" il menu di contesto generale con le funzionalità
 * dell'ER.
 * @param posX coordinata delle ascisse della posizione del menu.
 * @param posY coordinata delle ordinate della posizione del menu.
 */
export default function ERContextMenu({ posX, posY }) {
    const state = useSelector(state => state.designElements);
    const elements = state.elements;
    const dispatch = useDispatch();
    let isForElement = false;
    let isForAttribute = false;
    let elementId = 0;
    let isKey = false;

    // Dobbiamo trovare se un elemento è selezionato e agire di conseguenza:
    elements.forEach((element) => {
        if (element.selected) {
            isForElement = true;
            if (element.type === "attribute") {
                isForAttribute = true;
                if (element.options.key) {
                    isKey = true;
                }
            }
            elementId = element.id;
        }
    });

    console.log(elementId);

    /**
     * handleNewEntity
     * Funzione che gestisce l'inserimento di una nuova entità all'interno del progetto. 
     */
    function handleNewEntity() {
        dispatch(elementsSlice.actions.addElement(
            {
                type: "entity",
                selected: false,
                options: {
                    text: { value: "", width: 0 },
                    position: {
                        x: posX,
                        y: posY - 100,
                    },
                    minSize: 70,
                    size: {
                        width: 70,
                        height: 70,
                    },
                    connecting: false,
                },
            }
        ));
    }

    /**
     * handleNewRelationship
     * Funzione che gestisce l'inserimento di una nuova relazione all'interno del progetto.
     */
    function handleNewRelationship(event) {
        dispatch(elementsSlice.actions.addElement(
            {
                type: "relationship",
                selected: false,
                options: {
                    text: { value: "", width: 0 },
                    position: {
                        x: posX,
                        y: posY - 100,
                    },
                    minSize: 80,
                    size: {
                        width: 80,
                        height: 80,
                    },
                    connecting: false,
                },
            }
        ));
    }

    /**
     * handleDelete
     * Funzione che gestisce l'eliminazione di un elemento.
     */
    function handleDelete() {
        dispatch(elementsSlice.actions.removeElement({ id: elementId }));
    }

    /**
     * handleNewAttribute
     * Funzione che gestisce l'inserimento di un nuovo attributo per una determinata 
     * entità/relazine.
     */
    function handleNewAttribute() {
        dispatch(elementsSlice.actions.addElement({
            type: "attribute",
            selected: false,
            options: {
                text: { value: "", width: 0 },
                position: {
                    x: posX,
                    y: posY - 100,
                },
                minSize: 80,
                size: {
                    width: 80,
                    height: 80,
                },
                connecting: false,
                key: false,
            }
        }));
    }

    /**
     * handleNewAttribute
     * Funzione che gestisce l'inserimento di un nuovo attributo per una determinata 
     * entità/relazine.
     */
    function handleNewCardinality() {
        dispatch(elementsSlice.actions.addElement({
            type: "cardinality",
            selected: false,
            options: {
                text: { value: "", width: 0 },
                position: {
                    x: posX,
                    y: posY - 100,
                },
                minSize: 70,
                size: {
                    width: 70,
                    height: 70,
                }
            }
        }));
    }

    /**
     * handleKeyAttribute
     * Funzione che gestisce il cambiamento a chiave primaria di un
     * attributo.
     */
    function handleKeyAttribute(event) {
        dispatch(elementsSlice.actions.modifyElementOptions({ id: elementId, option: "key", value: !isKey }));
    }

    return (
        <ContextMenu posX={posX} posY={posY}>
            {isForElement
                ?
                <>
                    {isForAttribute && <ContextMenuOption text="Key" img="/assets/design/key.png" onClick={handleKeyAttribute} />}
                    <ContextMenuOption text="Delete" img="/assets/global/crossed-menu.png" onClick={handleDelete} />
                </>
                :
                <>
                    <ContextMenuOption text="Entity" img="/assets/design/add.png" onClick={handleNewEntity} />
                    <ContextMenuOption text="Relationship" img="/assets/design/add.png" onClick={handleNewRelationship} />
                    <ContextMenuOption text="Attribute" img="/assets/design/add.png" onClick={handleNewAttribute} />
                    <ContextMenuOption text="Cardinality" img="/assets/design/add.png" onClick={handleNewCardinality} />
                </>
            }
        </ContextMenu>
    );
}

