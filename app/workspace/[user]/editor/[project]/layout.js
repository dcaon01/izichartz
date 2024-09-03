import "@/app/globals.css";
import { inter } from "@/app/fonts";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function EditorLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}