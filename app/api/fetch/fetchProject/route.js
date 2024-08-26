import { Client } from "pg";
import { NextResponse } from "next/server";
import clientOpt from "@/lib/utility/pgClientOptions";

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
    const client = new Client(clientOpt);
    try {
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