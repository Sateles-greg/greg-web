// API pública para plugins externos (mock)
export async function registrarPlugin(plugin: any) {
  // TODO: registrar plugin no backend
  return { status: 'ok', plugin };
}

export async function listarPlugins() {
  // TODO: listar plugins registrados
  return [{ nome: 'Plugin Exemplo', ativo: true }];
}
