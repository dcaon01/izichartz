import classes from "./FooterInfo.module.css";
import Link from "next/link";

export default function FooterInfo() {
    return (
        <div className={classes.footerContainer}>
            <div className={classes.footerContent}>
                <div className={classes.footerColumn}>

                    <p className={`${classes.footerTitle}`}>MODULES</p>
                    <Link
                        href="/Entity-Relationship"
                        className={`${classes.footerText} ${classes.footerLink}`}
                    >
                        - Entity-Relationship
                    </Link>
                    <Link
                        href="/"
                        className={`${classes.footerText} ${classes.footerLink}`}
                    >
                        - Flowchart
                    </Link>
                </div>
                <div className={`${classes.footerColumn} ${classes.centerColumn}`}>
                    <p className={`${classes.footerTitle}`}>CONTACTS</p>
                    <div className={classes.footerComboLine}>
                        <p className={`${classes.footerText}`}>Email:&nbsp;</p>
                        <Link
                            href=""
                            className={`${classes.footerText} ${classes.footerLink}`}
                        >
                            info@izichartz.com
                        </Link>
                    </div>
                    <div className={classes.footerComboLine}>
                        <p className={`${classes.footerText}`}>Need help?&nbsp;</p>
                        <Link
                            href=""
                            className={`${classes.footerText} ${classes.footerLink}`}
                        >
                            Click here
                        </Link>
                    </div>
                </div>
                <div className={classes.footerColumn}>
                    <p className={`${classes.footerTitle}`}>SOCIALS</p>
                    <Link href="" className={classes.socialLink}>
                        <img src="/assets/global/youtube(bianco).png" height={20} width={20}/>
                        <p className={`${classes.footerText} ${classes.footerLink}`}> &nbsp;Youtube</p>
                    </Link>
                    <Link href="" className={classes.socialLink}>
                        <img src="/assets/global/instagram(bianco).png" height={20} width={20}/>
                        <p className={`${classes.footerText} ${classes.footerLink}`}> &nbsp;Instagram</p>
                    </Link>
                </div>
            </div>
        </div >
    );
};