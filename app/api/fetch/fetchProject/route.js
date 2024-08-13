import { Client } from "pg";
import { NextResponse } from "next/server";

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

/** 
 * Route handler per la verifica di esistenza di
 * un determinato progetto all'interno del database
 */
export async function POST(request) {
    const { value } = await request.json();
    const email = value.email;
    const name = value.name;
    const verifyProjectNameQuery = 'SELECT * FROM "PROJECTS" WHERE "name"=$1 and "owner"=$2';
    let response = {
        isOk: false
    }
    try {
        const client = new Client(clientOpt);
        await client.connect();
        const result = await client.query(verifyProjectNameQuery, [name, email]);
        if (result.rows.length === 1) {
            response.isOk = true;
        }
        client.end();
        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        client.end();
        return new NextResponse(JSON.stringify({
            isOk: false
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}