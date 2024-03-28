'use client';

import Entity from "./Entity.js";

/**
 * Generator
 * Componente che genera i componenti all'interno di un workpane.
 * @param generate: array di JSON da renderizzare
 */
export default function Generator({generate}) {
    /* Mappiamo i JSON contenuti in generate e in base al type
    generiamo un componente diverso, tra quelli del modulo */
    let generated = generate.map((component) => {
        switch (component.type) {
            case "Entity":
                return (
                    <Entity key={component.id} id={component.id} />
                );
            // end case
        }
    });

    /* Rendering */
    return (
        <>
            {generated}
        </>
    );
}

