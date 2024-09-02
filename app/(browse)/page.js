'use client';

import classes from "./HomePage.module.css";
import { robotoMono } from "../fonts.js";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import general from "@/app/general.module.css";
import OnScrollWrapper from "@/components/utility/OnScrollWrapper";

/**
 * Pagina che renderizza la home page di Izichartz
 * @refactor spostare tutto quello che è client side in un componente client, 
 * e tenere quello che è server nella pagina, in modo da renderizzare
 * più velocemente.
 */
export default function HomePage() {

  return (
    <main >
      <div className={classes.videoContainer}>
        <Suspense fallback={<img className={classes.homeVideo} src="/assets/global/homeimg.png" />}>
          <video className={classes.homeVideo} autoPlay muted loop playsInline>
            <source src="/assets/global/homevideo.mp4" type="video/mp4" />
          </video>
        </Suspense>
        <motion.div
          className={classes.hook}
          style={{
            padding: 40
          }}
          whileHover={{
            padding: 50,
          }}
        >
          <p className={`${classes.hookText} ${robotoMono.className}`}>The best</p>
          <p className={`${classes.hookText} ${classes.boldHookText} ${robotoMono.className}`}>Software Design Tool</p>
          <Link
            href="/authentication/login"
            className={`${classes.hookButton} ${robotoMono.className}`}
          >
            START DESIGNING NOW
          </Link>
        </motion.div>
      </div>
      <div className={general.content} style={{ paddingTop: 50 }}>

        <h1 className={`${robotoMono.className} ${general.title}`}>What's Izichartz?</h1>
        <div className={classes.section}>
          <OnScrollWrapper direction="right" intensity={30} size={45}>
            <p className={`${robotoMono.className} ${classes.description}`}>
              Izichartz is the best tool for software design. It aims to facilitate this crucial
              phase by improving functionalities and addressing issues found in similar
              existing programs.
            </p>
          </OnScrollWrapper>
          <OnScrollWrapper direction="left" intensity={30} size={45}>
            <Suspense fallback={<img className={classes.homeVideo} src="/assets/global/homeimg.png" />}>
              <video className={classes.miniVideo} autoPlay muted loop playsInline>
                <source src="/assets/global/homevideo.mp4" type="video/mp4" />
              </video>
            </Suspense>
          </OnScrollWrapper>
        </div>
        <div className={classes.section}>
          <OnScrollWrapper direction="right" intensity={30} size={45}>
            <Suspense fallback={<img className={classes.homeVideo} src="/assets/global/homeimg.png" />}>
              <video className={classes.miniVideo} autoPlay muted loop playsInline>
                <source src="/assets/global/homevideo.mp4" type="video/mp4" />
              </video>
            </Suspense>
          </OnScrollWrapper>
          <OnScrollWrapper direction="left" intensity={30} size={45}>
            <p className={`${robotoMono.className} ${classes.description}`}>
              Izichartz is the best tool for software design. It aims to facilitate this crucial
              phase by improving functionalities and addressing issues found in similar
              existing programs.
            </p>
          </OnScrollWrapper>
        </div>
      </div>
    </main >
  );
}