// Serviço de sinalização WebSocket para colaboração Greg
// Substitua a URL pelo backend real quando disponível
class SignalingService {
  ws: WebSocket | null = null;
  onMessage: (() => void) | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = () => {
      if (this.onMessage) this.onMessage();
    };
  }

  send() {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(''));
    }
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

export default new SignalingService();
