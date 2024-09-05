import "../../../globals.css";
import WorkspaceHeader from "@/components/layouts/WorkspaceHeader.js";
import Footer from "@/components/layouts/Footer.js";
import { robotoMono } from "../../../fonts.js";

export const metadata = {
  title: "Izichartz - Workspace",
  description: "The best software design tool",
};

export default function WorkspaceLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <WorkspaceHeader />
          {children}
        <Footer />
      </body>
    </html>
  );
}