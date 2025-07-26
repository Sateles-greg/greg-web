// Serviço de notificações automáticas simbióticas
export function enviarNotificacaoSimbiotica(titulo: string, mensagem: string) {
  // Simulação: exibe notificação no navegador
  if (window.Notification && Notification.permission === 'granted') {
    new Notification(titulo, { body: mensagem });
  } else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        new Notification(titulo, { body: mensagem });
      }
    });
  }
}
