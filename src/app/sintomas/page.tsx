"use client";

import { useState } from "react";
import { useAtendimento } from "../context/AtendimentoContext";

export default function Sintomas() {
  const { cpf, nome, email, telefone, setDados } = useAtendimento();
  const [sintomas, setSintomas] = useState("");

  const handleSubmit = async () => {
    if (!sintomas) {
      alert("Por favor, descreva os sintomas.");
      return;
    }

    setDados({ sintomas });

    try {
      const response = await fetch("/api/agendarAtendimento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, nomePacienteDigitado: nome, email, telefone, sintomas }),
      });

      const result = await response.json();

      if (response.ok) {
        // Define os cookies antes de redirecionar
        document.cookie = result.cookies;

        // Redireciona para a URL final
        window.location.href = result.url;
      } else {
        alert(result.error || "Erro ao registrar o atendimento.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao registrar o atendimento.");
    }
  };

  return (
    <div className="card shadow-sm p-4 text-center" style={{ maxWidth: "600px" }}>
      <h3 className="fw-bold mb-4">Descreva os Sintomas</h3>
      <textarea
        className="form-control mb-3"
        rows={5}
        value={sintomas}
        onChange={(e) => setSintomas(e.target.value)}
        placeholder="Descreva seus sintomas..."
      ></textarea>
      <button className="btn btn-success w-100" onClick={handleSubmit}>
        Enviar
      </button>
    </div>
  );
}
