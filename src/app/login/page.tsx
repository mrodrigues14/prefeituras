"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtendimento } from "../context/AtendimentoContext";

export default function Home() {
  const router = useRouter();
  const { setDados } = useAtendimento();
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const cleanCPF = (cpf: string) => cpf.replace(/\D/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanedCPF = cleanCPF(cpf);

    if (cleanedCPF.length !== 11) {
      setError("CPF inválido! Digite apenas números.");
      setLoading(false);
      return;
    }

    if (!dataNascimento) {
      setError("Por favor, insira sua data de nascimento.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: cleanedCPF, dataNascimento }),
      });

      const result = await response.json();

      if (result.success) {
        setDados(result.data);
        console.log(result.data);
        router.push("/atendimentos");
      } else {
        setError(result.error || "CPF ou data de nascimento incorretos.");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setError("Erro ao fazer login, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-md-flex flex-column flex-md-row vh-100 w-100 align-items-center justify-content-center">

      {/* Lado esquerdo - Formulário */}
      {/* Logo para telas pequenas */}
      <div className="text-center d-md-none mb-2 mt-4">
        <img src="/tessaro.jpg" alt="Drogaria Tessaro" width="200" height="200" />
      </div>

      <div className="col-12 col-md-6 col-lg-5 p-4">
        <div className="text-center mb-3">
          <h2 className="fw-bold fs-5">Bem-vindo ao teleatendimento da Drogaria Tessaro</h2>
          <p className="text-muted mb-3">Por favor, insira seus dados:</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Container com sombra para os inputs */}
        <div className="p-4 shadow-lg rounded bg-white mx-auto" style={{ maxWidth: "500px" }}>
          <form className="w-100" onSubmit={handleSubmit}>
            {/* Campo CPF com ícone */}
            <div className="mb-3">
              <label className="form-label">CPF</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-person text-muted"></i> {/* Ícone Bootstrap */}
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Digite seu CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  maxLength={14}
                />
              </div>
            </div>

            {/* Campo Data de Nascimento com ícone */}
            <div className="mb-3">
              <label className="form-label">Data de Nascimento</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-calendar text-muted"></i> {/* Ícone Bootstrap */}
                </span>
                <input
                  type="date"
                  className="form-control border-start-0"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>

      {/* Lado direito - Ilustração (some em telas pequenas) */}
      <div
        className="col-12 h-100 col-md-6 d-flex align-items-center justify-content-center d-none d-md-flex"
        style={{ background: "rgb(18, 7, 139)", padding: "20px", height: "100vh", width: "60%" }}
      >
        <div className="text-center">
          <img
            src="/tessaro.jpg"
            alt="Drogaria Tessaro"
            width="250"
            height="250"
            style={{ filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" }}
          />
        </div>
      </div>

    </div>
  );
}
