import ContextMenu from "@/components/modules/general/ui-elements/ContextMenu/ContextMenu";
import ContextMenuOption from "@/components/modules/general/ui-elements/ContextMenu/ContextMenuOption";
import { useDispatch, useSelector } from "react-redux";
import { elementsSlice } from "@/store/design/elements-slice";

/**
 * ERContextMenu
 * Componente che "estende" il menu di contesto generale con le funzionalità
 * dell'ER.
 * @param posX coordinata delle ascisse della posizione del menu.
 * @param posY coordinata delle ordinate della posizione del menu
 */
export default function ERContextMenu({ posX, posY }) {
    const state = useSelector(state => state.designElements);
    const elements = state.elements;
    const dispatch = useDispatch();
    let isForElement = false;

    // Dobbiamo trovare se un elemento è selezionato e agire di conseguenza:
    elements.forEach((element) => {
        if (element.selected) {
            isForElement = true;
        }
    });

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
                        y: posY,
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
                        y: posY,
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
     * handleNewAttribute
     * Funzione che gestisce l'inserimento di un nuovo attributo per una determinata 
     * entità/relazine.
     */
    function handleNewAttribute() {
        return null;
    }

    return (
        <ContextMenu posX={posX} posY={posY}>
            {isForElement
                ?
                <>
                    <ContextMenuOption text="Attribute" img="/assets/design/add.png" onClick={handleNewAttribute} /> 
                </>
                :
                <>
                    <ContextMenuOption text="Entity" img="/assets/design/add.png" onClick={handleNewEntity} />
                    <ContextMenuOption text="Relationship" img="/assets/design/add.png" onClick={handleNewRelationship} />
                </>
            }
        </ContextMenu>
    );
}

