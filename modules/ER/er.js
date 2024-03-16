import Workpane from '@/components/modules/general/Workpane.js';

export default function ER() {
    let components = [];
    let wpHeight = 0;
    let wpWidth = 0

    if (components.length === 0) {
        wpWidth = 1920;
        wpHeight = 720;
    }

    return (
        <>  
            <Workpane height={wpHeight} width={wpWidth}>

            </Workpane>
        </>
    );
}