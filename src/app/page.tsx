"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="d-flex flex-column vh-100 w-100 justify-content-center align-items-center p-3"
      style={{ backgroundColor: "#a2adaf", minHeight: "100vh" }}>

      {/* Logo acima do card */}
      <div className="text-center mb-4">
        <img src="/image.png" alt="Saúde e Cor" className="img-fluid" style={{ maxWidth: "250px", filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" }} />
      </div>

      {/* Card de login e cadastro */}
      <div className="card shadow-lg p-4 text-center w-100" style={{
        maxWidth: "600px",
        borderRadius: "12px",
        backgroundColor: "#FFF"
      }}>
        <p className="fs-5 fw-semibold text-dark">Seja bem-vindo ao atendimento de telemedicina do município Saúde e Cor!</p>

        <button className="btn btn-success mt-3 w-100 py-2 fw-bold" style={{ borderRadius: "8px" }}
          onClick={() => router.push("/login")}>
          Fazer Login
        </button>

        <button className="btn btn-primary mt-3 w-100 py-2 fw-bold" style={{ borderRadius: "8px", backgroundColor: "#3B82F6", border: "none" }}
          onClick={() => router.push("/cadastro")}>
          Fazer Cadastro
        </button>
      </div>
    </div>
  );
}
