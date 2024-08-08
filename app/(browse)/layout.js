import "./globals.css";
import Header from "@/components/layouts/Header.js";
import Footer from "@/components/layouts/Footer.js";
import { inter } from "../fonts.js";
import Session from "@/components/session/Session.js";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*<Session>*/}
          <Header />
          {children}
          <Footer />
        {/*</Session>*/}
      </body>
    </html>
  );
}
