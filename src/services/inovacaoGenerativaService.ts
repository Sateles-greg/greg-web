
// Motor de inovação generativa

export async function gerarIdeiaInovadora(contexto: string, area: string) {
  const promptMsg = `Contexto: ${contexto}\nÁrea: ${area}\nGreg: Proponha ideias inovadoras e soluções simbióticas.`;
  try {
    const response = await fetch('http://localhost:3001/api/greg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptMsg, modo: 'InovacaoGenerativa' })
    });
    const data = await response.json();
    return data.result || '[sem sugestão]';
  } catch (erro) {
    console.error('Erro ao gerar ideia inovadora:', erro);
    return '[Erro ao gerar ideia inovadora]';
  }
}
