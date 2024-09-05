import "@/app/globals.css";
import { robotoMono } from "../../../../fonts";

export const metadata = {
  title: "Izichartz - Editor",
  description: "The best software design tool",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function EditorLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className} style={{display: "flex"}}>
        {children}
      </body>
    </html>
  );
}