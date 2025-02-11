import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AtendimentoProvider } from "./context/AtendimentoContext";
import "./styles/globals.css";
import SidebarWrapper from "@/components/SidebarWrapper";
import Sidebar from "@/components/SideBar";

export const metadata = {
  title: "Teleatendimento - Prefeitura Teste",
  description: "Teleatendimento - Prefeitura Teste",
  icons: {
    icon: "/image.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <AtendimentoProvider>
        <body className="d-flex">
          <Sidebar /> {/* ✅ Movemos a lógica do pathname para esse componente */}
          <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-light">
            {children}
          </main>
        </body>
      </AtendimentoProvider>
    </html>
  );
}
