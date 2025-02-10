"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a sidebar
  const pathname = usePathname();
  const router = useRouter();

  // Verifica se está na página de login
  const isLoginPage = pathname === "/login";

  if (isLoginPage) return null; // Oculta a sidebar na página de login

  return (
    <>
      {/* Ícone de menu para abrir a sidebar em telas pequenas */}
      <button
        className="btn btn-light d-md-none position-absolute top-0 start-0 m-3"
        onClick={() => setIsOpen(true)}
      >
        <i className="bi bi-list fs-3"></i> {/* Ícone de menu (hambúrguer) */}
      </button>

      {/* Sidebar - sempre visível em telas grandes */}
      <aside
        className={`p-4 d-flex flex-column align-items-center position-fixed top-0 start-0 transition-sidebar
          ${isOpen ? "show-sidebar" : "d-none d-md-flex"}`} // Oculta em telas pequenas e mostra ao clicar no botão
        style={{ width: "300px", minHeight: "100vh", background: "rgb(18, 7, 139)", zIndex: 1050 }}
      >
        {/* Botão de fechar no topo para telas pequenas */}
        <button className="btn btn-light d-md-none align-self-end mb-3" onClick={() => setIsOpen(false)}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="text-center">
          <img src="/tessaro.jpg" alt="Drogaria Tessaro" width="200" height="200" />
        </div>

        <nav className="mt-4 w-100">
          <ul className="nav flex-column w-100">
            <li className="nav-item mb-3">
              <button
                className={`nav-link text-white w-100 p-2 ${pathname === "/atendimentos" ? "bg-secondary rounded" : ""}`}
                onClick={() => {
                  router.push("/atendimentos");
                  setIsOpen(false); // Fecha a sidebar após clicar no botão
                }}
              >
                <i className="bi bi-hospital-fill me-2"></i> Atendimento
              </button>
            </li>

            <li className="nav-item mb-3">
              <button
                className="nav-link text-white w-100 p-2"
                onClick={() => alert("Ajuda ainda não implementada!")}
              >
                <i className="bi bi-question-circle me-2"></i> Ajuda
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Fundo escuro ao abrir a sidebar em telas pequenas */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          style={{ zIndex: 1049 }}
          onClick={() => setIsOpen(false)} // Fecha ao clicar fora da sidebar
        ></div>
      )}
    </>
  );
}
