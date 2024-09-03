'use client'

import { lazy, Suspense } from "react";
import classes from "./DesktopToolbar.module.css";
const ProjectName = lazy(() => import("./ProjectName"));
import LoadingItem from "@/components/loading/LoadingItem";

export default function DesktopToolbar({ projectName }) {
    return (
        <nav className={classes.toolbar}>
            <Suspense fallback={
                <LoadingItem text={null}/>
            }>
                <ProjectName name={projectName} />
            </Suspense>
        </nav>
    );
}

