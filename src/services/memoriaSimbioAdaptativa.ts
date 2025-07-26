// Módulo de Memória Simbiótica Adaptativa
export type MemoriaSimbio = {
  tipo: 'contextual' | 'emocional' | 'factual';
  conteudo: string;
  data: string;
  relevancia: number;
};

let memoria: MemoriaSimbio[] = [];

export function registrarMemoria(mem: MemoriaSimbio) {
  memoria.push(mem);
  memoria = memoria.slice(-1000); // Limite adaptativo
  localStorage.setItem('greg_memoria_simbio', JSON.stringify(memoria));
}

export function recuperarMemorias(tipo?: MemoriaSimbio['tipo']): MemoriaSimbio[] {
  const dados = localStorage.getItem('greg_memoria_simbio');
  const todas = dados ? JSON.parse(dados) : [];
  return tipo ? todas.filter((m: MemoriaSimbio) => m.tipo === tipo) : todas;
}
