import Module from '@/components/modules/ER/Module.js';
import StoreProvider from './StorePrivider.js';

/**
 * EditorPage
 * Pagina dell'editor, che dovrebbe prelevare le informazioni generali per scegliere il modulo da
 * dispiegare. 
 */
export default function EditorPage() {
    /*
    Preleviamo lo stato delle info generali facendo una query sul nome del progetto e 
    sul token di sessione.
    */
    return (
        <main>
            <StoreProvider>
                <Module />
            </StoreProvider>
        </main>
    );
};