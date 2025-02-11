"use client";

import { useAtendimento } from "../context/AtendimentoContext";

export default function Atendimento() {
    const { nome, cpf, telefone, email, nascimento, setDados } = useAtendimento();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados({ [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/agendarAtendimento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cpf, nomePacienteDigitado: nome, email, telefone }),
            });

            const result = await response.json();

            if (response.ok) {
                document.cookie = result.cookies;
                window.location.href = `https://patient.docway.com.br/appointment/SulamericaVida/create?cartao=${cpf}`;
            } else {
                alert(result.error || "Erro ao registrar o atendimento.");
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert("Erro ao registrar o atendimento.");
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
                
                <h3 className="fw-bold mb-4 text-center">Atendimento</h3>

                <form onSubmit={(e) => e.preventDefault()} className="text-start">
                    {[
                        { label: "Nome", name: "nome", value: nome },
                        { label: "CPF", name: "cpf", value: cpf },
                        { label: "Telefone", name: "telefone", value: telefone },
                        { label: "Email", name: "email", value: email },
                        { label: "Data de Nascimento", name: "nascimento", value: nascimento, type: "date" },
                    ].map((field) => (
                        <div key={field.name} className="mb-3">
                            <label className="form-label">{field.label}:</label>
                            <input
                                type={field.type || "text"}
                                className="form-control"
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <button className="btn btn-success w-100 mt-3 py-2 fw-bold" onClick={handleSubmit}>
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    );
}
