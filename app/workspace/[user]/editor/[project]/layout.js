import "@/app/globals.css";
import { robotoMono } from "../../../../fonts";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function EditorLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className} >
          {children}
      </body>
    </html>
  );
}