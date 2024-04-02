'use client';

import { Entity } from "./Entity.js";
import Relationship from "./Relationship.js";

/**
 * Generator
 * elemente che genera i elementi all'interno di un workpane.
 * @param generate: array di JSON da renderizzare
 */
export default function Generator({ generate }) {
    /* Mappiamo i JSON contenuti in generate e in base al type
    generiamo un elemente diverso, tra quelli del modulo */
    let generated = generate.map((element) => {
        switch (element.type) {
            case "Entity":
                return (
                    <Entity key={element.type + element.id} id={element.id} options={element.options} selected={element.selected}/>
                );
            // end case
            case "Relationship":
                return (
                    <Relationship key={element.type + element.id} id={element.id} options={element.options} selected={element.selected}/>
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

