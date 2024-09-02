import general from "@/app/general.module.css";
import { robotoMono } from "@/app/fonts";
import OnScrollWrapper from "@/components/utility/OnScrollWrapper";
import Link from "next/link";

export default function PlansPage() {
    return (
        <div className={general.content} style={{
            paddingLeft: 100,
            paddingRight: 100
        }}>
            <h1 className={general.title}>Plans</h1>
            <div style={{ paddingTop: 30 }}>
                <OnScrollWrapper direction="up" intensity={30} size={100}>
                    <p className={robotoMono.className}>
                        Izichartz will be totally free for all the duration of the demo phase.
                        Feel free, though, to report bugs and issues, or to simply leave an advice
                        on how to improve the user experience, the workflow or the app in general.
                        You can write us through the form you can find in the <Link href="">Contacts</Link>
                        page.
                        We'll surely need all the help we could gather to improve and offer the best
                        and only sofware design tool our users will ever need.
                    </p>
                </OnScrollWrapper>
            </div>
        </div>
    );
}

