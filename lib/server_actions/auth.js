'use server';

import { Client } from "pg";
import validator from "validator";

/* 
    Questi dati sensibili vanno settati come variabili di ambiente. Su vercel le variabili di ambiente
    sono criptate e possiamo andarle a leggere con questa sintassi:
    process.env.NOME_VARIABILE
*/
const user = 'postgres';
const host = 'localhost';
const database = 'izichartz';
const password = '';
const port = 5432;

const client = new Client({  // Inserire le 
    user,
    host,
    database,
    password,
    port,
});

/**
 * userRegister
 * Server Action che gestisce l'iscrizione di un utente alla web app.
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa ServerAction
 */
export async function userRegister(prevState, formData) {
    let messages = [];

    const user = {
        username: formData.get("register-username"),
        email: formData.get("register-email"),
        password: formData.get("register-password"),
        conf_password: formData.get("register-confirm-password")
    }

    console.log(user);

    /* Controlli sugli inserimenti */
    checkUsername(user.username, messages);
    checkEmail(user.email, messages);
    checkEqualPasswords(user.password, user.conf_password, messages);
    checkPassword(user.password, messages);

    if (messages.length !== 0) {
        return { messages };
    }
}

/**
 * checkUsername
 * Funzione che controlla che uno user name rispetti i costraints di applicazione.
 * Il nome utente deve:
 * - non essere più lungo di 32 caratteri ma non più corto di 6 caratteri.
 * - deve essere alfanumerico.
 * @param username nome utente da controllare.
 * @param messages array di messaggi di errore da aggiornare nell'entualità.
 */
function checkUsername(username, messages) {
    /*
        Regex che funge da filtro per controllare 
        ^ individua l'inizio di una stringa.
        $ individua la fine di una stringa.
        * individua che tutti i caratteri all'interno di una parola devono rispettare l'insieme indicato.
    */
    const regex = /^([a-zA-Z0-9]*$)/; 
    if (username === "") {
        messages.push("Usarname is required. \n");
        return;
    }
    if (!(username.length <= 32 && username.length >= 6)) {
        messages.push("Username must be 6 to 32 characters long. \n");
        return;
    }
    if (!regex.test(username)) {
        messages.push("Username must be alphanumeric. \n");
        return;
    }
}

/**
 * checkEmail
 * Funzione che controlla che l'email rispetti i costraints di applicazione.
 * @param email email da controllare.
 * @param messages array di messaggi di errore da aggiornare nell'entualità.
 */
function checkEmail(email, messages) {
    if (email === "") {
        messages.push("Email is required. \n");
        return;
    }
    if (!validator.isEmail(email)) {
        messages.push("Email format is not valid. \n");
    }
}

/**
 * checkPassword
 * Funzione che controlla che la password sia almeno lunga 8 caratteri, 
 * ma più piccola di 32 e non deve contenere spazi. Non server controllare altro.
 * @param password password da controllare.
 * @param messages array di messaggi di errore da aggiornare nell'entualità.
 */
function checkPassword(password, messages) {
    const regex = /[]/
    if (password === "") {
        messages.push("Password is required.\n");
        return;
    }
    if (!(password.length <= 32 && password.length >= 8)) {
        messages.push("Password must be 8 to 32 characters long. \n");
    }
}

/**
 * checkEqualPasswords
 * Funzione che controlla se due password corrispondono.
 * @param psswrd1 prima password.
 * @param psswrd2 seconda password.
 * @param messages array di messaggi di errore da aggiornare nell'entualità.
 */
function checkEqualPasswords(psswrd1, psswrd2, messages) {
    if (psswrd1 !== psswrd2) {
        messages.push("Passwords aren't matching. \n");
    }
}

