// Serviço de sinalização WebSocket para colaboração Greg
// Substitua a URL pelo backend real quando disponível
class SignalingService {
  ws: WebSocket | null = null;
  onMessage: ((msg: any) => void) | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      if (this.onMessage) this.onMessage(JSON.parse(event.data));
    };
  }

  send(msg: any) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

export default new SignalingService();
