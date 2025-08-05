export async function gerarRespostaPorModo(
  texto: string,
  modoAtual: string
): Promise<string> {
  const promptBase: Record<string, string> = {
    Foco: 'Responda como um especialista conciso e objetivo.',
    Zen: 'Responda como um guia, gentil e presente.',
    Expansao: 'Responda como um provocador criativo, que instiga ideias novas.',
    Reparo: 'Responda como um cuidador acolhedor e restaurador.',
  };
  const promptMsg = `${promptBase[modoAtual] || 'Responda de forma útil e empática.'}\n${texto}`;
  try {
    const response = await fetch('http://localhost:3001/api/greg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptMsg, modo: modoAtual }),
    });
    const data = await response.json();
    return data.result || '[sem resposta]';
  } catch (erro) {
    console.error('Erro ao gerar resposta:', erro);
    return '[Erro ao gerar resposta simbiótica]';
  }
}
