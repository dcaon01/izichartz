import clientOpt from "@/lib/utility/pgClientOptions";
import { Client } from "pg";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { id } = await request.json();
    const fetchProjectQuery = 'SELECT * FROM "PROJECTS" WHERE "id"=$1';
    let results = null;
    let project = {};
    const client = new Client(clientOpt);
    try {
        await client.connect();
        results = await client.query(fetchProjectQuery, [id]);
        project = results.rows[0];
        client.end()
    } catch (error) {
        client.end();
        return new NextResponse(JSON.stringify(null),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    return new NextResponse(JSON.stringify(project),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        }
    );
}