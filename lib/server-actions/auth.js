'use server';

/**
 * @refactor 
 * - Sistemare l'invio delle email una volta che otteniamo un dominio che funziona.
 */

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Client } from "pg";
import validator from "validator";
import bcrypt from "bcrypt";
import cspnrg from "csprng";
import cryptoJS from "crypto-js";
import { revalidatePath } from "next/cache";
//import { Resend } from "resend";

/* 
    Questi dati sensibili vanno settati come variabili di ambiente. Su Vercel le variabili di ambiente
    sono criptate e possiamo andarle a leggere con questa sintassi:
    process.env.NOME_VARIABILE
*/
// Database
const client_user = process.env.DB_CLIENT_USER;
const client_host = process.env.DB_CLIENT_HOST;
const client_db = process.env.DB_CLIENT_DBNAME;
const client_password = process.env.DB_CLIENT_PASSWORD;
const client_port = process.env.DB_CLIENT_PORT;
const clientOpt = {
    user: client_user,
    password: client_password,
    host: client_host,
    port: client_port,
    database: client_db,
}
// Encryption
const c_key = process.env.C_KEY;

/**
 * userRegister
 * Server Action che gestisce l'iscrizione di un utente alla web app.
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa ServerAction
 */
export async function userRegister(prevState, formData) {
    const client = new Client(clientOpt);
    //const resend = new Resend(process.env.RESEND_API_KEY);
    let messages = [];
    const username = formData.get("register-username");
    const email = formData.get("register-email").toLowerCase();
    const password = formData.get("register-password");
    const conf_password = formData.get("register-confirm-password");
    const insertUserValues = [email, username];
    const insertActCodValues = [email];
    const insertEnrollSession = [email];
    const insertUserQuery = 'INSERT INTO "USERS"("email", "username", "psswrd") VALUES($1, $2, $3)';
    const verifyUsernameQuery = 'SELECT * FROM "USERS" WHERE "username"=$1';
    const verifyEmailQuery = 'SELECT * FROM "USERS" WHERE "email"=$1';
    const verifySlugQuery = 'SELECT * FROM "VERIF_CODES" WHERE "slug"=$1';
    const insertActivationCodeQuery = 'INSERT INTO "VERIF_CODES"("user", "code", "slug", "expires") VALUES($1, $2, $3, $4)';
    const insertEnrollSessionQuery = 'INSERT INTO "SESSIONS"("user", "sessionId", "data", "expires") VALUES($1, $2, $3, $4)';
    let result = null;
    let slug = null;
    let code = null;
    let present = true;
    let data = null;
    let sessId = null
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
        /* Avvio della transazione */
        await client.query('BEGIN');
        /* Controllare che non ci siano altri utenti con la stessa email e username */
        result = await client.query(verifyUsernameQuery, [username]);
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
        const hashedPassword = await hash(password);
        insertUserValues.push(hashedPassword);
        /* Inserimento dei dati dell'utente nel DB */
        await client.query(insertUserQuery, insertUserValues);
        /* Creazione del record nella tabella VERIF_CODES per i codici di verifica relativi all'utente. */
        code = generateRandomCode(27);
        //const hashedCode = await hash(code);
        //insertActCodValues.push(hashedCode);
        insertActCodValues.push(code);
        /* Generiamo lo slug */
        while (present) { // Controlliamo che lo slug non sia già presente.
            slug = generateRandomSlug(128);
            result = await client.query(verifySlugQuery, [slug]);
            if (result.rows.length === 0) {
                present = false;
                insertActCodValues.push(slug);
            }
        }
        /* Timestamp della data di oggi */
        const date = new Date(Date.now() + 300000); // 5 minuti
        insertActCodValues.push(date);
        /* Inserimento del record di verifica */
        await client.query(insertActivationCodeQuery, insertActCodValues);
        /* Generiamo e inseriamo il session id per l'enrolling */
        sessId = generateSessionId();
        const hashedSessId = await hash(sessId);
        data = { type: "enroll" };
        insertEnrollSession.push(hashedSessId, data, date);
        await client.query(insertEnrollSessionQuery, insertEnrollSession);
        /* Confermiamo la transazione */
        await client.query('COMMIT');
        /* Inviamo la mail col codice */
        /*
            const {data, error} = await resend.emails.send({
                from: 'notification@izichartz.com',
                to: email,
                subject: 'Verify your Izichartz account',
                html: `<h1>Activate your Izichartz Account</h1><p>Here's your activation code: ${code}<p>`
            });
        if(error){
            throw error;
        }
        */
        /* Settiamo il cookie */
        cookies().set('sid', JSON.stringify(
            {
                user: email,
                token: sessId
            }),
            {
                httpOnly: true,
                secure: true,
                expires: date
            }
        );
        console.log("Inserito il cookie");
        client.end();
    } catch (error) {
        console.log(error);
        messages.push("Something went wrong. Please, try again later.");
        /* Rollback della transazione */
        await client.query('ROLLBACK');
        /* Chiusura della connessione del client */
        client.end();
        return { messages };
    }
    revalidatePath(`/`);
    redirect(`/authentication/activation/${slug}`);
}

/**
 * userLogin
 * Server Action che gestisce il login di un utente alla web app.
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa server action.
 */
export async function userLogin(prevState, formData) {
    // Controllare, durante il login, che se un utente è registrato ma non è attivo,
    // di fargli fare la procedura di registrazione
}

/**
 * userAccountActivation
 * Server Action che permette di attivare l'account di un utente verificando che 
 * abbia inserito correttamente il codice che gli è arrivato.
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa server action. 
 */
export async function userAccountActivation(prevState, formData) {
    let messages = [];
    const code = formData.get("activation-code");
    const slug = formData.get("activation-slug");
    const client = new Client(clientOpt);
    const verifyQuery = 'SELECT "user", "code", "expires" FROM "VERIF_CODES" WHERE "slug"=$1';
    const activateQuery = 'UPDATE "USERS" SET "active"=$1 WHERE "email"=$2';
    const widthdrawUsernameQuery = 'SELECT "username" FROM "USERS" WHERE "email"=$1';
    const removeActivationCode = 'DELETE FROM "VERIF_CODES" WHERE "user"=$1';
    const changeSession = 'UPDATE "SESSIONS" SET "data"=$1, "expires"=$2 WHERE "user"=$3';
    let result = null;
    let username = null;
    let email = null;
    /* Controllo inserimenti */
    checkCode(code, messages);
    if (messages.length !== 0) {
        return { messages };
    }
    /* Verifica nel database e attivazione dell'account */
    try {
        await client.connect();
        // Verifichiamo che il code sia uguale (ovviamente per ora non lo hashamo ma dovremmo).
        result = await client.query(verifyQuery, [slug]);
        if (!(code === result.rows[0].code)) {
            messages.push("Code is not correct");
            return { messages };
        }
        // Verifichiamo che il codice non sia scaduto.
        if (result.rows[0].expires.getTime() < Date.now()) {
            messages.push("Code is expired, please resend it.");
            client.end();
            return { messages };
        }
        await client.query("BEGIN");
        // Modifichiamo lo stato dell'utente
        await client.query(activateQuery, [true, result.rows[0].user]);
        // Eliminiamo il codice di verifica
        email = result.rows[0].user;
        await client.query(removeActivationCode, [email]);
        // Cambiamo la sessione
        const date = new Date(Date.now() + 300000);
        const data = {
            type: "session"
        }
        await client.query(changeSession, [data, date, email]);
        await client.query("COMMIT");
        result = await client.query(widthdrawUsernameQuery, [email]);
        client.end();
        // Settiamo il nuovo cookie
        const sid = cookies().get('sid');
        cookies().set('sid', sid.value,
            {
                httpOnly: true,
                secure: true,
                expires: date
            }
        );
    } catch (error) {
        console.log(error);
        messages.push("Something went wrong. Please, try again later.");
        /* Rollback della transazione */
        await client.query('ROLLBACK');
        /* Chiusura della connessione del client */
        client.end();
        return { messages };
    }
    username = result.rows[0].username;
    redirect(`/workspace/${username}`);
}

/**
 * resendActivationCode
 * Server Action che inserisce nel db e invia un nuovo codice di verifica all'utente
 * per l'attivazione dell'account. 
 * @param prevState stato precedente, passato dall'hook useFormState.
 * @param formData dati passati dal submit del form linkato a questa server action.
 */
export async function resendActivationCode(prevState, formData) {

}

/**
 * verifySession
 * Funzione che verifica se una sessione è attiva.
 */
export async function verifySession(id) {

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
    }
}

/**
 * checkEmail
 * Funzione che controlla che l'email rispetti i costraints di applicazione.
 * @param email email da controllare.
 * @param messages array di messaggi di errore da aggiornare nell'eventualità.
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
 * @param messages array di messaggi di errore da aggiornare nell'eventualità.
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
 * @param messages array di messaggi di errore da aggiornare nell'eventualità.
 */
function checkEqualPasswords(psswrd1, psswrd2, messages) {
    if (psswrd1 !== psswrd2) {
        messages.push("Passwords aren't matching. \n");
    }
}

/**
 * checkCode
 * Funzione che controlla se il codice inserito è effettivamente un codice numerico.
 * @param code codice da verificare.
 * @param messages array di messaggi di errore da aggiornare nell'eventualità.
 */
function checkCode(code, messages) {
    const regex = /^([0-9]*$)/;
    if (!regex.test(code)) {
        messages.push("Code is invalid. \n");
    }
}

/**
 * generateRandomSlug
 * Funzione che genera uno slug alfanumerico randomico della lunghezza indicata.
 * @param length lunghezza (in bit) dello slug alfanumerico randomico. 128 dovrebbe essere sufficiente.
 * @returns slug alfanumerico randomico della lunghezza indicata.
 */
function generateRandomSlug(length) {
    return cspnrg(length, 36); // 36 sono le cifre alfanumeriche con lettere minuscole.
}

/**
 * generateRandomCode
 * Funzione che genera un codice numerico randomico della lunghezza indicata.
 * @param length lunghezza (in bit) del codice numerico randomico. 27 bit dovrebbero essere sufficienti.
 * @returns codice numerico randomico della lunghezza indicata.
 */
function generateRandomCode(length) {
    return cspnrg(length, 10); // 10 perché sono le cifre da 0 a 9
}

/** 
 * generateSessionId
 * Fuzione che genera un codice di sessione pseudorandomico e crittografico. 
 * Il codice viene generato di 256 bit in base 36 per garantire la massima entropia e non deducibilità.
 */
function generateSessionId() {
    return cspnrg(256, 36);
}

/**
 * hash
 * Funzione asincrona che permette di gestire la non asincronosità di hash di bcrypt,
 * in modo da risolvere il problema del bug di redirect.
 * Si ricorda che l'hashing è un'operazione irreversibile, quindi si possono solamente attuare
 * confronti tra hash di stringhe.
 * @param toHash stringa da salare e hashare.
 * @returns Promise che la password è statta calcolata correttamente.
 */
export async function hash(toHash) {
    const hashed = await new Promise((resolve, reject) => {
        bcrypt.hash(toHash, 7, function (err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
    return hashed;
}

/**
 * encrypt
 * Funzione che permette di cryptare una parola tramite la key nella variabile di ambiente.
 * @param word parola da criptare. 
 * @returns parola criptata.
 */
function encrypt(word) {
    return cryptoJS.AES.encrypt(word, c_key).toString();
}

/**
 * decrypt
 * @param encrypted parola da decriptare.
 * @returns parola decriptata.
 */
function decrypt(encrypted) {
    return cryptoJS.AES.decrypt(encrypted, c_key).toString(cryptoJS.enc.Utf8);
}
