"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Verifica se está na página de login
  const isLoginPage = pathname === "/login";

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Evita renderizar a sidebar na página de login
  if (isLoginPage) return null;

  return (
    <>
      {/* Botão de menu para telas menores */}
      <button
        className="btn btn-dark position-fixed top-0 start-0 m-3 d-md-none z-3"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Overlay para escurecer o fundo e permitir clique fora */}
      {menuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 999 }}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`p-4 d-flex flex-column align-items-center justify-content-between ${
          menuOpen ? "d-flex" : "d-none d-md-flex"
        }`}
        style={{
          width: "300px",
          minHeight: "100vh",
          backgroundColor: "black",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <div className="w-100">
          <div className="text-center">
            <img src="/image.png" alt="Saúde e Cor" width="250" height="250" />
          </div>
          <nav className="mt-4 w-100">
            <ul className="nav w-100">
              <li className="nav-item mb-3">
                <button
                  className={`nav-link text-white w-100 p-2 ${
                    pathname === "/atendimentos" ? "bg-secondary rounded" : ""
                  }`}
                  onClick={() => {
                    router.push("/atendimentos");
                    setMenuOpen(false);
                  }}
                >
                  <i className="bi bi-hospital-fill me-2"></i> Atendimento
                </button>
              </li>
              <li className="nav-item mb-3">
                <button
                  className={`nav-link text-white w-100 p-2 ${
                    pathname === "/cadastrar-dependente" ? "bg-secondary rounded" : ""
                  }`}
                  onClick={() => {
                    router.push("/cadastrar-dependente");
                    setMenuOpen(false);
                  }}
                >
                  <i className="bi bi-person-plus-fill me-2"></i> Cadastrar Dependente
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-white w-100 p-2"
                  onClick={() => {
                    alert("Ajuda ainda não implementada!");
                    setMenuOpen(false);
                  }}
                >
                  <i className="bi bi-question-circle me-2"></i> Ajuda
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Botão de Sair */}
        <button
          className="btn btn-danger w-100 mt-auto p-2"
          onClick={() => {
            router.push("/");
            setMenuOpen(false);
          }}
        >
          <i className="bi bi-box-arrow-right me-2"></i> Sair
        </button>
      </aside>
    </>
  );
}
