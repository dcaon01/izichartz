import general from "../../general.module.css";
import { robotoMono } from "@/app/fonts";

export default function ERPage() {
    return (
        <div className={general.content}>
            <h1 className={`${robotoMono.className}`}>
                Entity-Relationship Module
            </h1>
        </div>
    );
}

