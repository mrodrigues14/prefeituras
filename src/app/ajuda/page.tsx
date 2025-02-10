"use client";

export default function Ajuda() {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100 px-3">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-lg p-4 mt-3 mt-md-0">
                        <div className="card-body text-center">
                            <h3 className="fw-bold mb-4">Ajuda</h3>

                            <p className="mb-2">
                                <strong>Nome do Suporte:</strong> Suporte Drogaria Tessaro
                            </p>
                            <p className="mb-2">
                                <strong>Email:</strong> 
                                <a href="mailto:suporte@drogariatessaro.com" className="text-primary">
                                    suporte@drogariatessaro.com
                                </a>
                            </p>
                            <p className="mb-2">
                                <strong>Telefone:</strong> 
                                <a href="tel:+5561999999999" className="text-primary">
                                    (61) 99999-9999
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
