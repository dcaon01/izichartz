import clientOpt from "@/lib/utility/pgClientOptions";
import { Client } from "pg";
import { NextResponse } from "next/server";

/**
 * Route handler che permette di ottenere tutti i progetti collegati ad
 * un utente.
 */
export async function POST(request) {
    const { email } = await request.json();
    const fetchProjectsQuery = 'SELECT "name", "module", "creation", "preview" FROM "PROJECTS" WHERE "owner"=$1';
    const client = new Client(clientOpt);
    let projects = [];
    let results = null;
    try {
        await client.connect();
        results = await client.query(fetchProjectsQuery, [email]);
        console.log(results.rows);
        projects = results.rows;
        client.end()
    } catch (error) {
        client.end();
    }
    return new NextResponse(JSON.stringify(projects), 
    {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store"
    });
}