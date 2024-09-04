import "../globals.css";
import BrowseHeader from "@/components/layouts/BrowseHeader.js";
import Footer from "@/components/layouts/Footer.js";
import { robotoMono } from "../fonts.js";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <BrowseHeader />
          {children}
        <Footer />
      </body>
    </html>
  );
}
