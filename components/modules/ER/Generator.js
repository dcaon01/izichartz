'use client';

import Entity from "./Entity.js";


/* Generator 
*  Componente che genera i componenti all'interno di un workpane.
*  Props:
*  - generate: array di JSON che contengono tutte le informazioni per generare gli elementi
*/
export default function Generator({generate}) {
    // Mappiamo i JSON contenuti in generate e in base al type
    // generiamo un componente diverso, tra quelli del modulo
    let generated = generate.map((component) => {
        switch (component.type) {
            case "Entity":
                return (
                    <Entity key={component.id} id={component.id} />
                );
            // end case
        }
    });

    return (
        <>
            {generated}
        </>
    );
}

