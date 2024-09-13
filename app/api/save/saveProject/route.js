import clientOpt from "@/lib/utility/pgClientOptions";
import { Client } from "pg";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
/**
 * Route handler che gestisce il salvataggio dei progetti
 * @param request request con un json che ha questa struttura:
 * - id: identificativo del progetto
 * - content: 
 */
export async function POST(request) {
    const { id, content, preview } = await request.json();
    const saveProjectQuery = 'UPDATE "PROJECTS" SET "content"=$1, "lastModified"=$2, "preview"=$3 WHERE "id"=$4';
    const newContent = {
        ...content,
        status: "saved",
        selected: [],
        zoom: 50
    }
    const client = new Client(clientOpt);
    const imgName = `${id}.png`;
    const base64Data = preview.replace(/^data:image\/png;base64,/, '');
    // Definisci il percorso del file
    const filePath = path.join(process.cwd(), 'public', 'previews', imgName);
    try {
        await client.connect();
        await client.query("BEGIN");
        const date = new Date(Date.now());
        await client.query(saveProjectQuery, [newContent, date, `/previews/${imgName}`, id]);
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
    // Salviamo la preview
    fs.writeFileSync(filePath, base64Data, 'base64');
    return new NextResponse(JSON.stringify(null),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            //cache: "no-store"
        }
    );
}