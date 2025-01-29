"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Função para formatar CPF como "###.###.###-##"
function formatCPF(cpf: string) {
  const cleaned = cpf.replace(/\D/g, ""); // Remove tudo que não for número
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar data "aaaa-mm-dd" para "dd/mm/aaaa"
function formatDate(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function Cadastro() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    nascimento: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log("Formulário enviado!"); 
    console.log("Dados do Formulário:", form);

    const formattedCPF = formatCPF(form.cpf);
    const formattedNascimento = formatDate(form.nascimento);

    try {
        console.log(form)
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          cpf: formattedCPF,
          telefone: form.telefone,
          email: form.email,
          dataNascimento: formattedNascimento,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Cadastro realizado com sucesso!");
        router.push("/login");
      } else {
        setError(result.error || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100"
      style={{ backgroundColor: "#1E1E2E", minHeight: "100vh", padding: "20px" }}>
      
      <div className="card shadow-lg p-5 w-100"
        style={{
          maxWidth: "700px",
          borderRadius: "12px",
          backgroundColor: "#FFF"
        }}>

        <h3 className="fw-bold text-center mb-4">Cadastro</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="text-start">
          {[
            { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome" },
            { label: "CPF", name: "cpf", type: "text", placeholder: "000.000.000-00", maxLength: 14 },
            { label: "Telefone", name: "telefone", type: "text", placeholder: "(00) 00000-0000" },
            { label: "Email", name: "email", type: "email", placeholder: "exemplo@email.com" },
            { label: "Data de Nascimento", name: "nascimento", type: "date" },
          ].map((field) => (
            <div key={field.name} className="mb-3">
              <label className="form-label">{field.label}:</label>
              <input
                type={field.type}
                className="form-control"
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                maxLength={field.maxLength || undefined}
                required
              />
            </div>
          ))}

          <button type="submit" className="btn btn-success w-100 py-2 fw-bold" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
