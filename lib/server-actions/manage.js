"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Client } from "pg";
import { revalidatePath } from "next/cache";
import clientOpt from "../utility/pgClientOptions";

/**
 * Raccolta di server action per la gestione (creazione, eliminazione, modifica) dei file
 * dalla sezione manage del workspace
 */
export async function createProject(prevState, formData) {
    let messages = [];
    const name = formData.get("project-name");
    const module = formData.get("project-module");
    const insertProjectQuery = 'INSERT INTO "PROJECTS"("name", "owner", "module", "content", "creation", "preview") VALUES ($1, $2, $3, $4, $5, $6)';
    console.log(name);
    checkName(name, messages);
    console.log(module);
    if (module === "-") {
        messages.push("Module must be selected.")
    }
    if (messages.length > 0) {
        return { messages };
    }
    const client = new Client(clientOpt);
    const cookie = cookies().get('sid');
    const value = JSON.parse(cookie.value);
    const date = new Date(Date.now());
    try {
        await client.connect();
        await client.query("BEGIN");
        await client.query(insertProjectQuery, [name, value.email, module, {}, date, "/assets/design/workpane-bg.png"]);
        await client.query("COMMIT");
    } catch(error) {
        console.log(error);
        messages.push("Something went wrong. Please, try again later.");
        /* Rollback della transazione */
        await client.query('ROLLBACK');
        /* Chiusura della connessione del client */
        client.end();
        return { messages };
    }
    revalidatePath(`/workspace/${value.username}`);
    redirect(`/workspace/${value.username}/editor/${name}`);
}

/**
 * checkName
 * Funzione che controlla che il nome del progetto rispetti i costraints di applicazione
 * (anche per prevenire sql injection).
 * Il nome di un progetto deve:
 * - non essere più lungo di 128 caratteri ma non più corto di 1 carattere.
 * - deve essere alfanumerico.
 * @param name nome utente del progetto.
 * @param messages array di messaggi di errore da aggiornare nell'entualità.
 */
function checkName(name, messages) {
    /*
        Regex che funge da filtro per controllare 
        ^ individua l'inizio di una stringa.
        $ individua la fine di una stringa.
        * individua che tutti i caratteri all'interno di una parola devono rispettare l'insieme indicato.
    */
    const regex = /^([a-zA-Z0-9_-]*$)/;
    if (name === "") {
        messages.push("The project name is required. \n");
        return;
    }
    if (!(name.length <= 128 && name.length >= 1)) {
        messages.push("The project name must be 1 to 128 characters long. \n");
        return;
    }
    if (!regex.test(name)) {
        messages.push('The project name must be alphanumeric (including "-" and "_"). \n');
    }
}