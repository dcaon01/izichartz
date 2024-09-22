'use client';

import { ERA } from "./ERA.js";
import { Linker } from "../general/design-elements/Linker.js";
import { Cardinality } from "./Cardinality.js";

/**
 * Generator
 * elemente che genera i elementi all'interno di un workpane.
 * @param generate array di JSON da renderizzare.
 */
export default function Generator({ generate }) {

    /* Mappiamo i JSON contenuti in generate e in base al type
    generiamo un elemente diverso, tra quelli del modulo */
    let generated = generate.map((element) => {
        switch (element.type) {
            case "entity":
                return (
                    <ERA
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        type={element.type}
                        options={element.options}
                        selected={element.selected}
                    //links={linksMatrix[element.id - 1]}
                    />
                );
            // end case
            case "relationship":
                return (
                    <ERA
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        type={element.type}
                        options={element.options}
                        selected={element.selected}
                    //links={linksMatrix[element.id - 1]}
                    />
                );
            // end case
            case "attribute":
                return (
                    <ERA
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        type={element.type}
                        options={element.options}
                        selected={element.selected}
                    />
                );
            // end case
            case "linker":
                return (
                    <Linker
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        options={element.options}
                        selected={element.selected}
                    />
                );
            // end case
            case "cardinality":
                return (
                    <Cardinality 
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        options={element.options}
                        selected={element.selected}
                    />
                );
                // end case
            default:
                return null;
            // end default
        }
    });

    /* Rendering */
    return (
        <>
            {generated}
        </>
    );
}

