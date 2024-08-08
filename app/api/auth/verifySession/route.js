import { NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcrypt";

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

export async function POST(request) {
    // Andiamo a verificare la sessione, tramite il session ID mandato nella richiesta
    const client = new Client(clientOpt);
    const { sid } = await request.json();
    const user = JSON.parse(sid.value).user;
    const token = JSON.parse(sid.value).token;
    console.log("user: " + user + " token: " + token);
    const findUserQuery = 'SELECT * FROM "SESSIONS" WHERE "user"=$1';
    const checkEnroll = 'SELECT * FROM "VERIF_CODES" WHERE "user"=$1';
    const updateSidQuery = 'UPDATE "SESSIONS" SET "expires"=$1 WHERE "user"=$2';
    let result = null;
    let response = {
        isSessionValid: false,
        verifSlug: null
    };
    try {
        await client.connect();
        await client.query('BEGIN');
        result = await client.query(findUserQuery, [user]);
        // Controlliamo che ci sia un record con il token
        console.log("Risultato delle query: " + result.rows[0].user);
        if (result.rows.length !== 0) {
            // Troviamo il token associato
            const hashedToken = result.rows[0].sessionId;
            const match = bcrypt.compare(token, hashedToken);
            if (match) {
                // Controlliamo che non sia scaduto
                if (Date.now() < result.rows[0].expires) {
                    response.isSessionValid = true;
                    // Controlliamo se è una sessione di verifica dell'account
                    if (result.rows[0].data.type === "enroll") {
                        const user = result.rows[0].user;
                        result = await client.query(checkEnroll, [user]);
                        console.log("Risultato delle query: " + result.rows[0]);
                        response.verifSlug = result.rows[0].slug;
                    } else {
                        // Aggiorniamo la data di scadenza del token el DB
                        const date = new Date(Date.now() + 300000);
                        client.query(updateSidQuery, [date, user]);
                        console.log("Risultato delle query: " + result.rows[0]);
                    }
                }
            } 
        }
        await client.query('COMMIT');
        client.end();
        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.end();
        return new NextResponse(JSON.stringify({
            isSessionValid: false,
            verifSlug: null
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}