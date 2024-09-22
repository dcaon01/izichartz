import { NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcrypt";
import clientOpt from "@/lib/utility/pgClientOptions";

export async function POST(request) {
    // Andiamo a verificare la sessione, tramite il session ID mandato nella richiesta
    const client = new Client(clientOpt);
    const { sid } = await request.json();
    const email = JSON.parse(sid.value).email;
    const token = JSON.parse(sid.value).token;
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
        result = await client.query(findUserQuery, [email]);
        // Controlliamo che ci sia un record con il token
        if (result.rows.length !== 0) {
            // Troviamo il token associato
            const hashedToken = result.rows[0].sessionId;
            const match = await bcrypt.compare(token, hashedToken);
            if (match) {
                // Controlliamo che non sia scaduto
                if (Date.now() < result.rows[0].expires) {
                    response.isSessionValid = true;
                    // Controlliamo se è una sessione di verifica dell'account
                    if (result.rows[0].data.type === "enroll") {
                        const user = result.rows[0].user;
                        result = await client.query(checkEnroll, [user]);
                        response.verifSlug = result.rows[0].slug;
                    } else {
                        // Aggiorniamo la data di scadenza del token el DB
                        const date = new Date(Date.now() + 43200000);
                        client.query(updateSidQuery, [date, email]);
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