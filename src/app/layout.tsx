"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AtendimentoProvider } from "./context/AtendimentoContext";
import Sidebar from "@/components/SideBar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Pega a URL atual
  const hideSidebar = pathname === "/" || pathname === "/cadastro"; // Oculta na Home e Cadastro

  return (
    <html lang="pt">
      <AtendimentoProvider>
        <body className="d-flex">
          {!hideSidebar && <Sidebar />} {/* A Sidebar só aparece se NÃO for a Home */}
          <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-light">
            {children}
          </main>
        </body>
      </AtendimentoProvider>
    </html>
  );
}
