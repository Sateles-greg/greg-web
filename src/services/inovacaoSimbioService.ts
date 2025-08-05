// Motor de inovação simbiótica e generativa

export async function sugerirInovacaoSimbio(
  contexto: string,
  area: string
): Promise<string> {
  const prompt = `Contexto: ${contexto}\nÁrea: ${area}\nGreg: Sugira ideias inovadoras, produtos ou soluções simbióticas para esta área.`;
  try {
    const response = await fetch('http://localhost:3001/api/greg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, modo: 'InovacaoSimbio' }),
    });
    const data = await response.json();
    return data.result || '[sem sugestão]';
  } catch (erro) {
    console.error('Erro ao sugerir inovação:', erro);
    return '[Erro ao sugerir inovação]';
  }
}
export default sugerirInovacaoSimbio;
