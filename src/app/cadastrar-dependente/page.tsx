"use client";

import { useState } from "react";
import { useAtendimento } from "../context/AtendimentoContext";

// Função para formatar CPF como "###.###.###-##"
function formatCPF(cpf: string) {
  const cleaned = cpf.replace(/\D/g, ""); // Remove tudo que não for número
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para converter data de "aaaa-mm-dd" para "dd/mm/aaaa"
function formatDate(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function CadastrarDependente() {
  const { cpf, nascimento } = useAtendimento();

  const [form, setForm] = useState({
    nomeDependente: "",
    cpfDependente: "",
    nascimentoDependente: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedCPF = formatCPF(cpf);
    const formattedDataNascimento = formatDate(nascimento);
    const formattedCPFDependente = formatCPF(form.cpfDependente);
    const formattedNascimentoDependente = formatDate(form.nascimentoDependente);

    const response = await fetch("/api/cadastrarDependente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: formattedCPF,
        dataNascimento: formattedDataNascimento,
        nomeDependente: form.nomeDependente,
        cpfDependente: formattedCPFDependente,
        nascimentoDependente: formattedNascimentoDependente,
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Dependente cadastrado com sucesso!");
      setForm({ nomeDependente: "", cpfDependente: "", nascimentoDependente: "" });
    } else {
      alert("Erro ao cadastrar dependente.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100"
      style={{minHeight: "100vh", padding: "20px" }}>

      <div className="card shadow-lg p-5 w-100"
        style={{
          maxWidth: "700px", // Aumentando o tamanho do card
          borderRadius: "12px",
          backgroundColor: "#FFF"
        }}>
        
        <h3 className="fw-bold text-center mb-4">Cadastrar Dependente</h3>

        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              name="nomeDependente"
              value={form.nomeDependente}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input
              type="text"
              className="form-control"
              name="cpfDependente"
              value={form.cpfDependente}
              onChange={handleChange}
              placeholder="000.000.000-00"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <input
              type="date"
              className="form-control"
              name="nascimentoDependente"
              value={form.nascimentoDependente}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
