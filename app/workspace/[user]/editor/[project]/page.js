import Module from '@/components/modules/ER/Module.js';
import StoreProvider from './StorePrivider.js';

/**
 * EditorPage
 * Pagina dell'editor, che dovrebbe prelevare le informazioni generali per scegliere il modulo da
 * dispiegare. 
 * Nello specifico:
 * > preleva l'identificativo del progetto dall'url, anche se sarebbe meglio passare il dato 
 * per altri meccanismi, indipendenti dal lato client (come gli headers, l'utente possiamo prelevarlo dai cookies) 
 * > Una volta prelevato tutto, si passano le informazioni necessarie ai componenti figli, che saranno:
 * - modulo, che gestisce il posizionamento degli elementi del disegno, che magari chiamiamo già ERModule, con il suo generatore, 
 * che chiamiamo ERGenerator.
 * Meglio mantenere tutto separato, perché così abbiamo molta più indipendenza dei vari moduli (per esempio)
 * non è detto che per un determinato tipo di modello voglia un workpane, mentre per tutti c'è la sidebar.
 * - La navbar, che ha le funzionalità basilari di ridenominazione del progetto, di undo, redo, zoom, esportazione
 * - La sidebar, che permette la modifica indiretta degli elementi. 
 * Questi due ultimi elementi sono invece comuni a tutti i moduli. Non so come potrebbero essere generalizzati 
 * (Navbar molto semplice, sidebar un po meno) ma ci possiamo lavorare.
 */
export default function EditorPage() {
    /* tramite headers potremmo riuscire a prelevare il nome del progetto (l'utente ce lo abbiamo già dal cookie) */
    return (
        <main>
            <StoreProvider>
                <Module />
            </StoreProvider>
        </main>
    );
};