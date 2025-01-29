import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// Função para formatar telefone
function formatPhoneNumber(phone: string): string {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
}

export async function POST(req: NextRequest) {
    try {
        const { cpf, nomePacienteDigitado, email, telefone, sintomas } = await req.json();
        console.log("ℹ️ Dados Recebidos:", cpf, nomePacienteDigitado, email, telefone, sintomas);

        const formattedPhone = formatPhoneNumber(telefone);
        console.log("📞 Telefone Formatado:", formattedPhone);

        const browser = await puppeteer.launch({
            headless: true,
            executablePath: await chromium.executablePath(),
            args: chromium.args, // Argumentos otimizados para o Vercel
        });
        const page = await browser.newPage();
        await page.goto(`https://patient.docway.com.br/appointment/SulamericaVida/create?cartao=${cpf}`, { waitUntil: "networkidle2" });

        // Captura os cookies e aplica de novo para garantir persistência
        // const cookies = await page.cookies();
        // await page.setCookie(...cookies);

        // // Clica no botão "Next"
        // const buttonSelector = ".button-next";
        // await page.waitForSelector(buttonSelector, { visible: true });
        // await page.click(buttonSelector);
        // await page.waitForNavigation({ waitUntil: "networkidle2" });

        // // Seleciona paciente
        // const nomesSelector = "label.checkbox-container";
        // await page.waitForSelector(nomesSelector, { visible: true });

        // const nomes = await page.$$eval(nomesSelector, labels =>
        //     labels.map(label => ({
        //         nome: label.textContent?.trim().replace(/\s*\(.*?\)\s*/g, ""),
        //         value: label.querySelector('input[type="radio"]')?.getAttribute("value") || "",
        //         inputSelector: `input[type="radio"][value="${label.querySelector('input[type="radio"]')?.getAttribute("value")}"]`
        //     }))
        // );

        // const nomeCorrespondente = nomes.find(item =>
        //     item.nome?.trim().toLowerCase() === nomePacienteDigitado.trim().toLowerCase()
        // );

        // if (!nomeCorrespondente) {
        //     throw new Error("❌ Nome não encontrado.");
        // }

        // await page.evaluate(selector => document.querySelector(selector)?.click(), nomeCorrespondente.inputSelector);
        // await page.waitForSelector(buttonSelector, { visible: true });
        // await page.click(buttonSelector);
        // await page.waitForNavigation({ waitUntil: "networkidle2" });

        // // Preenche o formulário
        // const emailSelector = "#input-email";
        // const phoneSelector = "#input-phone";
        // const submitButtonSelector = "#btnRequest";

        // await page.waitForSelector(emailSelector, { visible: true });
        // await page.type(emailSelector, email);

        // await page.waitForSelector(phoneSelector, { visible: true });
        // await page.type(phoneSelector, formattedPhone);

        // await page.evaluate(selector => {
        //     const button = document.querySelector(selector);
        //     if (button && button.disabled) button.removeAttribute("disabled");
        // }, submitButtonSelector);

        // await page.click(submitButtonSelector);
        // console.log("✅ Informações enviadas!");
        // await page.waitForNavigation({ waitUntil: "networkidle2" });

        // // Preenche os sintomas
        // const sintomasSelector = "#input-reason";
        // await page.waitForSelector(sintomasSelector, { visible: true });
        // await page.type(sintomasSelector, sintomas, { delay: 100 });

        // const sintomasSubmitButtonSelector = "#btnRequest";
        // await page.waitForSelector(sintomasSubmitButtonSelector, { visible: true });
        // await page.evaluate(selector => {
        //     const button = document.querySelector(selector);
        //     if (button && button.disabled) button.removeAttribute("disabled");
        // }, sintomasSubmitButtonSelector);

        // await page.click(sintomasSubmitButtonSelector);
        // console.log("✅ Sintomas enviados!");

        //await page.waitForNavigation({ waitUntil: "networkidle2" });


        // URL final com sessão válida
        const finalURL = page.url();
        console.log(finalURL)
        await browser.close();

        return NextResponse.json({ success: true, url: finalURL });
    } catch (error) {
        const err = error as Error;
        console.error("🚨 Erro:", err.message);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
    
}
