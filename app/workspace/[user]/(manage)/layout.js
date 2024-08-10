import WorkspaceHeader from "@/components/layouts/WorkspaceHeader.js";
import Footer from "@/components/layouts/Footer.js";
import { inter } from "../fonts.js";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function WorkspaceLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WorkspaceHeader />
          {children}
        <Footer />
      </body>
    </html>
  );
}