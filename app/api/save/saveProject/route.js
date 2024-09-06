import clientOpt from "@/lib/utility/pgClientOptions";
import { Client } from "pg";
import { NextResponse } from "next/server";

/**
 * 
 * @param request request con un json che ha questa struttura:
 * - id: identificativo del progetto
 * - content: 
 */
export async function POST(request) {
    const { id, content } = await request.json();
    const saveProjectQuery = 'UPDATE "PROJECTS" SET "content"=$1, "lastModified"=$2 WHERE "id"=$3';
    const newContent = {
        ...content,
        status: "saved",
        selected: [],
        zoom: 50
    }
    const client = new Client(clientOpt);
    try {
        await client.connect();
        await client.query("BEGIN");
        const date = new Date(Date.now());
        await client.query(saveProjectQuery, [newContent, date, id]);
        await client.query("COMMIT");
        client.end()
    } catch (error) {
        console.log(error);
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
    return new NextResponse(JSON.stringify(null),
        {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            //cache: "no-store"
        }
    );
}