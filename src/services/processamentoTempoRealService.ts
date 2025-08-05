// Serviço de processamento em tempo real para ASI Greg
export class BufferInteligente<T> {
  private buffer: T[] = [];
  private limite: number;
  constructor(limite = 100) {
    this.limite = limite;
  }
  adicionar(dado: T) {
    this.buffer.push(dado);
    if (this.buffer.length > this.limite) this.buffer.shift();
  }
  obterTodos() {
    return [...this.buffer];
  }
  limpar() {
    this.buffer = [];
  }
}

export async function processarDadosEmTempoReal<T>(
  dados: T[],
  callback: (dado: T) => Promise<void>
) {
  for (const dado of dados) {
    await callback(dado);
  }
}
