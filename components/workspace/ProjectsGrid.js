import classes from "./ProjectsGrid.module.css";
import { cookies } from "next/headers";
import { Suspense, lazy } from "react";
import LoadingItem from "@/components/loading/LoadingItem";
const ProjectCard = lazy(() => import("./ProjectCard"));

/**
 * ProjectGrid
 * Componente che renderizza la griglia con tutti i progetti relativi ad 
 * un utente. 
 * @refactor fare in modo che i progetti vengano refetchati.
 * @refactor gestire il caso in cui venga ritornato 500 come status code.
 */
export default async function ProjectGrid() {
    const cookie = cookies().get('sid');
    const value = JSON.parse(cookie.value);
    const email = value.email;
    const fetchedProjects = await fetch(new URL("http://localhost:3000/api/fetch/fetchProjects"),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        }
    );
    let projects = await fetchedProjects.json();
    // Ordiniamo in ordine decrescente di data di modifica.
    await projects.sort((proj1, proj2) => {
        return new Date(proj2.lastModified).getTime() - new Date(proj1.lastModified).getTime();
    });

    return (
        <div className={classes.gridContainer}>
            <Suspense fallback={
                <LoadingItem text="Fetching projects..." />
            }>
                {
                    projects.length === 0 ?
                        <div className={classes.noProjects}>
                            <p style={{ fontSize: 13 }}>No project found.</p>
                            <p style={{ fontSize: 13 }}>Click "New Project" to create one.</p>
                        </div>
                        :
                        projects.map((project) => {
                            const creation = timestampToReadableFormat(project.creation);
                            console.log(project.lastModified);
                            const lastModified = timestampToReadableFormat(project.lastModified);
                            console.log(project.preview);
                            return (<ProjectCard key={project.id} id={project.id} name={project.name} module={project.module} creation={creation} lastModified={lastModified} preview={project.preview} />);
                        })
                }
            </Suspense>
        </div>
    );
}

/**
 * timestampToReadableFormat()
 * Funzione che prende in pasto una data in timestamp e 
 * la ritorna col seguente formato: YYYY/MM/DD HH:mm
 * @param toConvert data in timestamp da convertire.
 * @return data convertita nel formato designato.
 */
function timestampToReadableFormat(timestamp) {
    // Mettiamo la data in un formato leggibile
    const date = new Date(timestamp);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Opzioni per la formattazione della data e dell'ora
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // usa il formato 24 ore
        timeZone: timeZone, // applica il fuso orario dell'utente
    };
    const formattedDateTime = date.toLocaleString('default', options);
    // Modifica il formato per "YYYY/MM/DD HH:mm"
    // Split per ottenere data e ora separati
    const [datePart, timePart] = formattedDateTime.split(', ');
    const [month, day, year] = datePart.split('/');
    const formattedDate = `${year}/${month}/${day}`;
    const newDate = `${formattedDate} ${timePart}`;
    return newDate;
}

