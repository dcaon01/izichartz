import "./globals.css";
import { Inter } from "next/font/google";
import MainHeader from "@/components/navigation/MainHeader.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MainHeader/>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
