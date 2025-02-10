"use client";

import { useRouter } from "next/navigation"; // Importa o useRouter
import { useAtendimento } from "../context/AtendimentoContext";

export default function Atendimento() {
    const { nome, cpf, telefone, email, nascimento, setDados } = useAtendimento();
    const router = useRouter(); // Hook para redirecionamento interno

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados({ [name]: value });
    };

    const handleSubmit = () => {
        if (!cpf) {
            alert("CPF é obrigatório!");
            return;
        }

        const url = `https://patient.docway.com.br/appointment/SulamericaVida/create?cartao=${cpf}`;
        router.push(url); // Redireciona para a URL gerada
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
            <div className="row w-100 justify-content-end">
                {/* Div fantasma que só aparece em telas grandes para empurrar o card */}
                
                <div className="col-12 col-md-8 col-lg-5">
                    {/* Card Responsivo com Ajuste para a Direita */}
                    <div className="card shadow-lg p-4">
                        <div className="card-body">
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
                
                </div>
                <div className="d-none d-lg-block" style={{ width: "25%" }}></div>

            </div>
        </div>
    );
}
