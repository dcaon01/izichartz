'use server';

import { redirect } from "next/navigation";
import { Client } from "pg";
import validator from "validator";
import bcrypt from "bcrypt";

/* 
    Questi dati sensibili vanno settati come variabili di ambiente. Su Vercel le variabili di ambiente
    sono criptate e possiamo andarle a leggere con questa sintassi:
    process.env.NOME_VARIABILE
*/
const client_user = 'postgres';
const client_host = 'localhost';
const client_db = 'izichartz';
const client_password = '011702';
const client_port = 5432;

/**
 * userRegister
 * Server Action che gestisce l'iscrizione di un utente alla web app.
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa ServerAction
 */
export async function userRegister(prevState, formData) {
    const client = new Client({
        user: client_user,
        password: client_password,
        host: client_host,
        port: client_port,
        database: client_db,
    });
    let messages = [];
    const username = formData.get("register-username");
    const email = formData.get("register-email");
    const password = formData.get("register-password");
    const conf_password = formData.get("register-confirm-password");
    const insertValues = [email, username];
    const insertQuery = 'INSERT INTO "USERS"("email", "username", "psswrd") VALUES($1, $2, $3)';
    const verifyUsernameQuery = 'SELECT * FROM "USERS" WHERE "username"=$1';
    const verifyEmailQuery = 'SELECT * FROM "USERS" WHERE "email"=$1';
    let result = null;

    /* Controlli sugli inserimenti */
    checkUsername(username, messages);
    checkEmail(email, messages);
    checkEqualPasswords(password, conf_password, messages);
    checkPassword(password, messages);
    if (messages.length !== 0) {
        return { messages };
    }

    try {
        /* Connessione col DB */
        await client.connect();
        /* Controllare che non ci siano altri utenti con la stessa email e username */
        result = await client.query(verifyUsernameQuery, [username]);
        console.log(result);
        if (result.rows.length > 0) {
            messages.push("Username already exists.");
        }
        result = await client.query(verifyEmailQuery, [email]);
        if (result.rows.length > 0) {
            messages.push("Email already registered.");
        }
        if (messages.length !== 0) {
            client.end();
            return { messages };
        }
        /* Hashing della password */
        const hashedPassword = await hashPassword(password);
        insertValues.push(hashedPassword);
        /* Inserimento dei dati nel DB */
        result = await client.query(insertQuery, insertValues);
    } catch (error) {
        console.log(error);
        messages.push("Something went wrong. Please, try again later.");
        client.end();
        return { messages };
    } finally {
        client.end();
        redirect("/workspace");
    }
}

/**
 * userLogin
 * Server Action che gestisce il login di un utente alla web app.
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa server action.
 */
export async function userLogin(prevState, formData) {

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
        messages.push("Username is required. \n");
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

/**
 * hashPassword
 * Funzione asincrona che permette di gestire la non asincronosità di hash di bcrypt,
 * in modo da risolvere il problema del bug di redirect.
 * @param password 
 * @returns Promise che la password è statta calcolata correttamente.
 */
async function hashPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 7, function (err, hash) {
            console.log('culo');
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });

    return hashedPassword;
}