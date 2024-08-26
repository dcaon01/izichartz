import classes from "./ProjectsGrid.module.css";
import { cookies } from "next/headers";
import { Suspense, lazy } from "react";
import LoadingItem from "@/components/loading/LoadingItem";
import { robotoMono } from "@/app/fonts";
const ProjectCard = lazy(() => import("./ProjectCard"));

/**
 * ProjectGrid
 * Componente che renderizza la griglia con tutti i progetti relativi ad 
 * un utente. 
 * @refactor fare in modo che i progetti vengano refetchati
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
    const projects = await fetchedProjects.json();

    return (
        <div className={classes.gridContainer}>
            <Suspense fallback={
                <LoadingItem text="Fetching projects..." />
            }>
                {
                    projects.length === 0 ?
                        <div className={classes.noProjects}>
                            <p className={robotoMono.className} style={{ fontSize: 13 }}>No project found.</p>
                            <p className={robotoMono.className} style={{ fontSize: 13 }}>Click "New Project" to create one.</p>
                        </div>
                        :
                        projects.map((project) => {
                            // Mettiamo la data in un formato leggibile
                            const date = new Date(project.creation);
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
                            console.log(project.preview);
                            return (<ProjectCard key={project.name} name={project.name} module={project.module} creation={newDate} preview={project.preview} />);
                        })
                }
            </Suspense>
        </div>
    );
}

