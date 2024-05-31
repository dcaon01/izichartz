import "./globals.css";
import Header from "@/components/global-layout/Header.js";
import Footer from "@/components/global-layout/Footer.js";
import { inter } from "../fonts.js";
import { Suspense } from "react";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
