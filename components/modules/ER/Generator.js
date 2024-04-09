'use client';

import { Entity } from "./Entity.js";
import { Relationship } from "./Relationship.js";
import { Linker } from "./Linker.js";

/**
 * Generator
 * elemente che genera i elementi all'interno di un workpane.
 * @param generate array di JSON da renderizzare.
 */
export default function Generator({ generate, functs }) {
    /* Creiamo la matrice di collegamenti, in modo da riuscire a passarli agli elementi che non sono
    link e gestirli all'interno di essi - Ma ha senso? */
    let linksMatrix = [];
    generate.forEach((element, index) => {
        linksMatrix.push([]);
        if (element.type === "link") {
            element.options.linked.forEach((id, index) => {
                linksMatrix[id - 1].push(element);
            });
        }
    });

    /* Mappiamo i JSON contenuti in generate e in base al type
    generiamo un elemente diverso, tra quelli del modulo */
    let generated = generate.map((element) => {
        switch (element.type) {
            case "entity":
                return (
                    <Entity
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        options={element.options}
                        selected={element.selected}
                        links={linksMatrix[element.id - 1]}
                        functs={functs}
                    />
                );
            // end case
            case "relationship":
                return (
                    <Relationship
                        key={`${element.type}-${element.id}`}
                        id={element.id}
                        options={element.options}
                        selected={element.selected}
                        links={linksMatrix[element.id - 1]}
                        functs={functs}
                    />
                );
            // end case
            /*
            case "Link":
                return (
                    <Linker 
                        key={`${element.type}-${element.id}`} 
                        id={element.id} 
                        options={element.options} 
                        selected={element.selected}
                    />
                )
            */
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

