import ERModule from '@/components/modules/ER/ERModule.js';
import StoreProvider from './StoreProvider.js';
import Toolbar from "@/components/modules/general/ui-elements/Toolbar/Toolbar.js";
import { headers } from 'next/headers';

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
 * - Per risolvere l'assenza di internet mettiam un suspanse per tutta la pagina in modo che l'utente
 * non possa fare un cazzo prima che tutto sia caricato.
 */
export default async function EditorPage() {
    const headersList = headers();
    const id = headersList.get('Project-Id');
    const project = await getProject(id);
    console.log("Stampiamo il progetto in EditorPage: " + JSON.stringify(project));

    // Scelta del modulo da utilizzare

    return (
        <main>
            <StoreProvider content={project.content}>
                <Toolbar projectName={project.name} id={project.id}/>
                <ERModule />
            </StoreProvider>
        </main>
    );
};

/**
 * getProject
 * Funzione che fetcha tutti i dati relativi al progetto, selezionato tramite il suo id.
 * @param id identificativo del progetto alla quale vogliamo lavorare.
 * @returns json con i dati relativi del progetto prelevato.
 */
async function getProject(id) {
    const resp = await fetch(new URL('http://localhost:3000/api/fetch/fetchProject'),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
    );
    let project = await resp.json();
    return project;
    // Gestire anche l'errore del server
}