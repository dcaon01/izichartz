'use client';

import classes from "./HomePage.module.css";
import { robotoMono } from "../fonts.js";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
            href=""
            className={`${classes.hookButton} ${robotoMono.className}`}
          >
            START DESIGNING NOW
          </Link>
        </motion.div>
      </div>
      <div className={classes.homeContent}>
          <h1 className={`${robotoMono.className}`}>What's Izichartz?</h1>
      </div>
    </main>
  );
}