import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AtendimentoProvider } from "./context/AtendimentoContext";
import "./styles/globals.css";
import SidebarWrapper from "@/components/SidebarWrapper";

export const metadata = {
  title: "Drogaria Tessaro",
  description: "Drogaria Tessaro",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <AtendimentoProvider>
        <body className="d-flex">
          <SidebarWrapper /> {/* ✅ Movemos a lógica do pathname para esse componente */}
          <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-light">
            {children}
          </main>
        </body>
      </AtendimentoProvider>
    </html>
  );
}
