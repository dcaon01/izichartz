import classes from "./FooterInfo.module.css";
import { robotoMono } from "@/app/fonts";
import Link from "next/link";

export default function FooterInfo() {
    return (
        <div className={classes.footerContainer}>
            <div className={classes.footerContent}>
                <div className={classes.footerColumn}>

                    <p className={`${robotoMono.className} ${classes.footerTitle}`}>MODULES</p>
                    <Link
                        href="/Entity-Relationship"
                        className={`${robotoMono.className} ${classes.footerText} ${classes.footerLink}`}
                    >
                        - Entity-Relationship
                    </Link>
                    <Link
                        href="/"
                        className={`${robotoMono.className} ${classes.footerText} ${classes.footerLink}`}
                    >
                        - Flowchart
                    </Link>
                </div>
                <div className={`${classes.footerColumn} ${classes.centerColumn}`}>
                    <p className={`${robotoMono.className} ${classes.footerTitle}`}>CONTACTS</p>
                    <div className={classes.footerComboLine}>
                        <p className={`${robotoMono.className} ${classes.footerText}`}>Email:&nbsp;</p>
                        <Link
                            href=""
                            className={`${robotoMono.className} ${classes.footerText} ${classes.footerLink}`}
                        >
                            info@izichartz.com
                        </Link>
                    </div>
                    <div className={classes.footerComboLine}>
                        <p className={`${robotoMono.className} ${classes.footerText}`}>Need help?&nbsp;</p>
                        <Link
                            href=""
                            className={`${robotoMono.className} ${classes.footerText} ${classes.footerLink}`}
                        >
                            Click here
                        </Link>
                    </div>
                </div>
                <div className={classes.footerColumn}>
                    <p className={`${robotoMono.className} ${classes.footerTitle}`}>SOCIALS</p>
                    <Link href="" className={classes.socialLink}>
                        <img src="/assets/global/youtube(bianco).png" height={20} width={20}/>
                        <p className={`${robotoMono.className} ${classes.footerText} ${classes.footerLink}`}> &nbsp;Youtube</p>
                    </Link>
                    <Link href="" className={classes.socialLink}>
                        <img src="/assets/global/instagram(bianco).png" height={20} width={20}/>
                        <p className={`${robotoMono.className} ${classes.footerText} ${classes.footerLink}`}> &nbsp;Instagram</p>
                    </Link>
                </div>
            </div>
        </div >
    );
};