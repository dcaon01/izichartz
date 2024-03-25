import Entity from "./Entity.js";

/* Generator 
*  Componente che genera i componenti all'interno di un workpane.
*  Props:
*  - generate: array di JSON che contengono tutte le informazioni per generare gli elementi
*/
export default function Generator({ generate }) {
    let generated = generate.map((component) => {
        switch (component.type) {
            case "Entity":
                return (
                    <Entity key={component.id} options={component.options} />
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

