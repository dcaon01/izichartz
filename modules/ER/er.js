import Workpane from '@/components/modules/general/Workpane.js';
import Rectangle from '@/components/modules/graphics/Rectangle.js';

export default function ER() {
    let components = []; // mettere il selector qui in modo.
    let wpHeight = 0;
    let wpWidth = 0

    if (components.length === 0) {
        wpWidth = 1920;
        wpHeight = 720;
    }

    return (
        <>
            <Workpane h={wpHeight} w={wpWidth}>
                <Rectangle t={"ciao"} x={150} y={200}/>
            </Workpane>
        </>
    );
}

/* Per generare i componenti giusti potremmo andare ad utilizzare un componente apposito,
*  che gestisce tutti i casi di rendering di componente in base al campo "type" che deve gestire.
*  In questo modo avremmo un mapping automatico e "quasi generale", da mettere in lib.
*/