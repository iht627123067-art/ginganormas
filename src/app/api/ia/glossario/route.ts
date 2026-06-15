import { NextRequest, NextResponse } from "next/server";

interface CitacaoInput {
  id: number;
  citacaoDireta: string;
  citacaoExtensa: string;
  autores: string;
  fonte: string;
  notaRapida: string;
}

interface EntradaInput {
  termo: string;
  citacoes: CitacaoInput[];
}

interface GlossarioRequest {
  entradas: EntradaInput[];
  steps: string[];
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY não configurada em .env.local" }, { status: 500 });
  }

  let body: GlossarioRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON do corpo da requisição inválido" }, { status: 400 });
  }

  const { entradas, steps } = body;
  if (!entradas?.length || !steps?.length) {
    return NextResponse.json({ error: "Payload inválido: entradas e steps são obrigatórios" }, { status: 400 });
  }

  const hasConsolidar = steps.includes("consolidar");
  const hasCorrecao = steps.includes("correcao");
  const hasTraducao = steps.includes("traducao");
  const hasNotas = steps.includes("notas");

  const fieldLines: string[] = [];
  if (hasConsolidar || hasCorrecao) {
    const desc = hasConsolidar
      ? '"verbete": "Definição acadêmica consolidada (3-5 frases) que sintetiza todas as citações com linguagem de dicionário jurídico-acadêmico. Preserve o rigor terminológico e a neutralidade científica."'
      : '"verbete": "Texto que reúne e corrige ortograficamente as citações, organizando-as como uma definição coesa do termo."';
    fieldLines.push(desc);
  }
  if (hasTraducao) {
    fieldLines.push('"verbete_en": "Tradução acadêmica do verbete para inglês, preservando termos técnicos de gestão pública e inovação governamental."');
  }
  if (hasNotas) {
    fieldLines.push('"notas_rodape": [{ "posicao": "após [trecho]", "texto_nota": "...", "tipo_nota": "doutrinaria|historica|jurisprudencial" }]');
  }

  if (fieldLines.length === 0) {
    return NextResponse.json({ error: "Nenhuma etapa válida selecionada" }, { status: 400 });
  }

  const entradasText = entradas
    .map((e, i) => {
      const citsText = e.citacoes
        .map(
          (c, j) =>
            `  [${j + 1}] "${c.citacaoDireta}"\n       Autores: ${c.autores}\n       Fonte: ${c.fonte}${c.notaRapida ? `\n       Nota contextual: ${c.notaRapida}` : ""}`
        )
        .join("\n\n");
      return `TERMO ${i + 1}: ${e.termo}\nCITAÇÕES SELECIONADAS:\n${citsText}`;
    })
    .join("\n\n" + "─".repeat(60) + "\n\n");

  const jsonSchema = `{
  "entradas": [
    {
      "termo": "nome do termo exato",
      ${fieldLines.join(",\n      ")}
    }
  ]
}`;

  const prompt = `Você é um lexicógrafo especializado em direito público e inovação governamental brasileiro.

Para cada termo abaixo, gere uma entrada de glossário acadêmico com os campos especificados.

SCHEMA JSON ESPERADO:
${jsonSchema}

REGRAS:
- O campo "termo" deve ser IDÊNTICO ao fornecido
- O verbete deve ter linguagem formal e rigorosa, adequada a obras de referência acadêmica
- Preserve termos técnicos jurídicos e de gestão pública sem simplificação
- Cada entrada do array "entradas" corresponde a um TERMO diferente
- Retorne APENAS o JSON válido, sem markdown, sem texto adicional

TERMOS PARA O GLOSSÁRIO:
${entradasText}`;

  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022";

  let response: Response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 8192,
        system: "Você é um lexicógrafo jurídico-acadêmico especializado em inovação pública. Responda APENAS com JSON válido, sem markdown ou explicações.",
        messages: [
          { role: "user", content: prompt },
          { role: "assistant", content: "{" },
        ],
      }),
    });
  } catch (err) {
    return NextResponse.json({ error: "Erro de conexão com a API Anthropic: " + String(err) }, { status: 502 });
  }

  if (!response.ok) {
    let errMsg = "Erro na chamada à API Anthropic";
    try {
      const e = await response.json();
      errMsg = e.error?.message ?? JSON.stringify(e);
    } catch {
      errMsg = await response.text();
    }
    return NextResponse.json({ error: errMsg }, { status: response.status === 401 ? 401 : 502 });
  }

  const data = await response.json();
  const rawText = data.content?.[0]?.text ?? "";
  let text = ("{" + rawText).trim();

  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || start >= end) throw new Error("Marcadores JSON não encontrados");
    const parsed = JSON.parse(text.slice(start, end + 1));
    return NextResponse.json({
      resultado: parsed,
      steps,
      modelo: data.model || model,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Falha ao analisar resposta da IA: " + String(err), texto_bruto: rawText },
      { status: 500 }
    );
  }
}
