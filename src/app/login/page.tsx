"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtendimento } from "../context/AtendimentoContext";

export default function Login() {
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
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100"
      style={{ backgroundColor: "#1E1E2E", minHeight: "100vh", padding: "20px" }}>
      
      <div className="card shadow-lg p-5 text-center w-100"
        style={{
          maxWidth: "500px", // Aumentando o tamanho do card
          borderRadius: "12px",
          backgroundColor: "#FFF"
        }}>
        
        <h3 className="fw-bold mb-4">Login</h3>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit} className="w-100 text-start">
          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={14}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <input
              type="date"
              className="form-control"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
