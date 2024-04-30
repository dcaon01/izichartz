'use client';

import { usePathname } from "next/navigation";
import FooterInfo from "../footer/FooterInfo";

export default function Footer() {
    let path = usePathname();

    return (
        <footer>
            {path.startsWith("/workspace/editor/")
                ? null
                : <FooterInfo />
            }
        </footer>
    );
};