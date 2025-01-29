import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// Função para formatar CPF "000.000.000-00"
function formatCPF(cpf: string) {
  const cleaned = cpf.replace(/\D/g, ""); // Remove tudo que não for número
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
// Função para converter data "aaaa-mm-dd" para "dd/mm/aaaa"
function formatDate(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

// Função para obter a data atual formatada como "dd/mm/aaaa"
function getCurrentDate() {
  const now = new Date();
  return formatDate(now.toISOString().split("T")[0]);
}

export async function POST(req: Request) {
  try {
    const { nome, telefone, email, cpf, dataNascimento } = await req.json();

    if (!nome || !cpf || !dataNascimento) {
      return NextResponse.json({ success: false, error: "Nome, CPF e Data de Nascimento são obrigatórios." }, { status: 400 });
    }

    
    // Formatar CPF
    const formattedCPF = formatCPF(cpf);

    // 🔹 Verifica se o CPF já está cadastrado
    let cliente = await prisma.tb_clientes.findUnique({ where: { cpf: formattedCPF } });

    if (!cliente) {
      // 🔹 Criar novo cliente
      cliente = await prisma.tb_clientes.create({
        data: {
          nome,
          telefone,
          email,
          cpf: formattedCPF,
          data_nascimento: new Date(dataNascimento),
        },
      });

      console.log("✅ Novo cliente cadastrado:", cliente);
    } else {
      console.log("⚠️ Cliente já existente:", cliente);
    }

    // 🔹 Selecionar um cliente existente com menos dependentes
    const clienteMenosDependentes = await prisma.tb_clientes.findFirst({
      orderBy: {
        other_tb_clientes: { _count: "asc" },
      },
    });

    console.log("✅ Cliente com menos dependentes:", clienteMenosDependentes);

    if (!clienteMenosDependentes) {
      return NextResponse.json({ success: false, error: "Nenhum cliente disponível para vincular o dependente." }, { status: 500 });
    }

    // 🔹 Atualiza o novo usuário para ser dependente do clienteMenosDependentes
    await prisma.tb_clientes.update({
      where: { idCliente: cliente.idCliente },
      data: {
        idClienteDependente: clienteMenosDependentes.idCliente,
        data_vinculo: getCurrentDate(),
      },
    });

    console.log(`✅ Cliente ${cliente.nome} vinculado ao responsável ${clienteMenosDependentes.nome}`);

    // 🔹 Chamar Puppeteer para registrar na SulAmérica
    const puppeteerResponse = await registrarDependenteNoSite(
      clienteMenosDependentes.cpf,
      formatDate(clienteMenosDependentes.data_nascimento.toISOString().split("T")[0]),
      cliente.nome,
      cliente.cpf,
      formatDate(cliente.data_nascimento.toISOString().split("T")[0])
    );

    return NextResponse.json({
      success: true,
      message: "Cadastro e inclusão de dependente realizados com sucesso!",
      puppeteerResponse
    });

  } catch (error) {
    console.error("🚨 Erro:", error);
    return NextResponse.json({ success: false, error: "Erro no servidor ao cadastrar cliente." }, { status: 500 });
  }
}

// 🔹 Função para registrar dependente no site usando Puppeteer
async function registrarDependenteNoSite(cpf: string, dataNascimento: string, nomeDependente: string, cpfDependente: string, nascimentoDependente: string) {
  try {
    
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: await chromium.executablePath(),
      args: chromium.args, // Argumentos otimizados para o Vercel
  });

  const page = await browser.newPage();
    await page.goto("https://sulamericavida.docway.com.br/", { waitUntil: "domcontentloaded" });

    // Preenchendo CPF e Data de Nascimento
    await page.waitForSelector("#cpfInput", { visible: true });
    console.log(`📌 Inserindo CPF: ${cpf}`);
    await page.type("#cpfInput", formatCPF(cpf));

    await page.waitForSelector("#dataNascimentoTitular", { visible: true });
    console.log(`📌 Inserindo Data de Nascimento: ${dataNascimento}`);
    await page.type("#dataNascimentoTitular", dataNascimento);

    // Clicando no botão "Validar Dados"
    const validarButtonSelector = "#btn-validar";
    await page.waitForSelector(validarButtonSelector, { visible: true });
    await page.click(validarButtonSelector);

    console.log("✅ Validação Bem-Sucedida!");

    // Aguarda o carrossel mudar para permitir o cadastro do dependente
    await page.waitForFunction(() => {
      const activeItem = document.querySelector(".carousel-item.active");
      return activeItem && activeItem.querySelector("#btn-cadastrar");
    }, { timeout: 5000 });

    console.log("✅ Carrossel navegou para a tela de cadastro!");

    // Clicando no botão "Cadastrar Dependente"
    await page.waitForSelector("#btn-cadastrar", { visible: true });
    await page.click("#btn-cadastrar");

    console.log("✅ Botão 'Cadastrar Dependente' clicado!");

    // Espera a tela de cadastro do dependente carregar
    await page.waitForSelector("#dadosDependente", { visible: true });

    // Preenchendo Nome do Dependente
    await page.waitForSelector("#nomeDependente", { visible: true });
    console.log(`📌 Inserindo Nome do Dependente: ${nomeDependente}`);
    await page.type("#nomeDependente", nomeDependente);

    // Preenchendo Data de Nascimento do Dependente
    await page.waitForSelector("#dataNascimentoDependente", { visible: true });
    console.log(`📌 Inserindo Data de Nascimento do Dependente: ${nascimentoDependente}`);
    await page.type("#dataNascimentoDependente", nascimentoDependente);

    // Preenchendo CPF do Dependente
    await page.waitForSelector("#cpfDependente", { visible: true });
    console.log(`📌 Inserindo CPF do Dependente: ${cpfDependente}`);
    await page.type("#cpfDependente", cpfDependente);

    // Clicando no botão "Cadastrar Dependente"
    const cadastrarDependenteButtonSelector = "#btn-proximo-dependente";
    await page.waitForSelector(cadastrarDependenteButtonSelector, { visible: true });
    await page.click(cadastrarDependenteButtonSelector);

    console.log("✅ Dependente Cadastrado!");

    await browser.close();
    return { success: true, message: "Dependente cadastrado no site." };
  } catch (error) {
    console.error("🚨 Erro no Puppeteer:", error);
    return { success: false, error: "Erro ao registrar dependente no site." };
  }
}
