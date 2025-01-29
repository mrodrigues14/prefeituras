import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { cpf, dataNascimento } = await req.json();
    const cleanedCPF = cpf.replace(/\D/g, "");

    const user = await prisma.tb_clientes.findFirst({
      where: { cpf: cleanedCPF },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Usuário não encontrado." }, { status: 404 });
    }

    const formattedBirthDate = new Date(dataNascimento).toISOString().split("T")[0];

    if (user.data_nascimento.toISOString().split("T")[0] !== formattedBirthDate) {
      return NextResponse.json({ success: false, error: "Data de nascimento incorreta." }, { status: 401 });
    }

    // 🔹 Retorna os dados completos do cliente
    return NextResponse.json({
      success: true,
      data: {
        nome: user.nome,
        cpf: user.cpf,
        telefone: user.telefone || "",
        email: user.email || "",
        nascimento: user.data_nascimento.toISOString().split("T")[0], // Formata a data para yyyy-MM-dd
      },
    });
  } catch (error) {
    console.error("Erro ao processar login:", error);
    return NextResponse.json({ success: false, error: "Erro ao processar login." }, { status: 500 });
  }
}
