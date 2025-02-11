"use client"; // Necessário para usar hooks como usePathname e useRouter

import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Verifica se está na página de login
  const isLoginPage = pathname === "/login";

  if (isLoginPage) return null; // Oculta a sidebar na página de login

  return (
    <aside
      className="p-4 d-flex flex-column align-items-center justify-content-between"
      style={{ width: "300px", minHeight: "100vh", backgroundColor: "black" }}
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
                onClick={() => router.push("/atendimentos")} // Redireciona para Atendimento
              >
                <i className="bi bi-hospital-fill me-2"></i> Atendimento
              </button>
            </li>
            <li className="nav-item mb-3">
              <button
                className={`nav-link text-white w-100 p-2 ${
                  pathname === "/cadastrar-dependente" ? "bg-secondary rounded" : ""
                }`}
                onClick={() => router.push("/cadastrar-dependente")} // Redireciona para Cadastrar Dependente
              >
                <i className="bi bi-person-plus-fill me-2"></i> Cadastrar Dependente
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-white w-100 p-2"
                onClick={() => alert("Ajuda ainda não implementada!")} // Adicione comportamento para Ajuda aqui
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
          router.push("/"); // Redireciona para a página de login
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i> Sair
      </button>
    </aside>
  );
}
