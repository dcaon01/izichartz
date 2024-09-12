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
      <body 
        className={robotoMono.className}
        style={{
          margin: 0,
          padding: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {children}
      </body>
    </html>
  );
}