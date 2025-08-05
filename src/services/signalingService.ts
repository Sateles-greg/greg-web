// Serviço de sinalização WebSocket para colaboração Greg
// Substitua a URL pelo backend real quando disponível
class SignalingService {
  ws: WebSocket | null = null;
  onMessage: ((msg: any) => void) | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      if (this.onMessage) {
        try {
          const msg = JSON.parse(event.data);
          this.onMessage(msg);
        } catch {
          this.onMessage(event.data);
        }
      }
    };
  }

  send(payload: any) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(payload));
    }
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

export default new SignalingService();
