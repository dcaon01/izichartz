import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/global/logo.png";
import classes from "./MainHeader.module.css";
import NavLink from "./NavLink";

export default function MainHeader() {

    return (
        <header className={classes.header}>
            <Link href="/" className={classes.logo}>
                <Image src={logoImg} alt="A plate with food on it" priority />
                Next Level Food
            </Link>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals">Browse Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Foodies Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}