// Plugin colaborativo: protótipo inicial
import signalingService from '../services/signalingService';

let peerConnection: RTCPeerConnection | null = null;
let dataChannel: RTCDataChannel | null = null;

const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function colaborativo({ onMessage, sendMessage }: any) {
  function iniciarConexao(remotoId: string) {
    peerConnection = new RTCPeerConnection(config);
    dataChannel = peerConnection.createDataChannel('greg');
    dataChannel.onmessage = (e) => onMessage && onMessage(e.data);
    dataChannel.onopen = () => sendMessage && sendMessage('Canal aberto!');
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        signalingService.send({ type: 'candidate', candidate: event.candidate, to: remotoId });
      }
    };
    peerConnection.createOffer().then(offer => {
      peerConnection!.setLocalDescription(offer);
      signalingService.send({ type: 'offer', offer, to: remotoId });
    });
  }

  function receberOferta(offer: any, from: string) {
    peerConnection = new RTCPeerConnection(config);
    peerConnection.ondatachannel = (e) => {
      dataChannel = e.channel;
      dataChannel.onmessage = (ev) => onMessage && onMessage(ev.data);
      dataChannel.onopen = () => sendMessage && sendMessage('Canal aberto!');
    };
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        signalingService.send({ type: 'candidate', candidate: event.candidate, to: from });
      }
    };
    peerConnection.setRemoteDescription(offer);
    peerConnection.createAnswer().then(answer => {
      peerConnection!.setLocalDescription(answer);
      signalingService.send({ type: 'answer', answer, to: from });
    });
  }

  function receberResposta(answer: any) {
    peerConnection && peerConnection.setRemoteDescription(answer);
  }

  function receberCandidate(candidate: any) {
    peerConnection && peerConnection.addIceCandidate(candidate);
  }

  function enviarMensagem(msg: string) {
    dataChannel && dataChannel.readyState === 'open' && dataChannel.send(msg);
  }

  // Expor funções para o painel
  return {
    nome: 'colaborativo',
    descricao: 'Colabore em tempo real com outros usuários Greg.',
    status: 'ativo',
    iniciarConexao,
    receberOferta,
    receberResposta,
    receberCandidate,
    enviarMensagem,
    desconectar: () => { peerConnection && peerConnection.close(); },
  };
}
