import "../globals.css";
import BrowseHeader from "@/components/layouts/BrowseHeader.js";
import Footer from "@/components/layouts/Footer.js";
import { inter } from "../fonts.js";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BrowseHeader />
          {children}
        <Footer />
      </body>
    </html>
  );
}
