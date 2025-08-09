// ColaborativoPanel.tsx has been removed as it is no longer needed.
import React, { useState, useEffect, useRef } from 'react';
// ...existing code...
import colaborativoPlugin from '../../integrations/plugins/colaborativo';
import signalingService from '../../services/signalingService';
import styles from './ColaborativoPanel.module.css';

const mockUsers = ['Greg-Alpha', 'Greg-Beta', 'Greg-Gamma'];
const SIGNALING_URL = 'wss://greg-signaling-mock.example.com'; // Substitua pelo backend real

const ColaborativoPanel: React.FC = () => {
  const [convites, setConvites] = useState<string[]>([]);
  const [conectado, setConectado] = useState<string | null>(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const pluginRef = useRef<any>(null);

  useEffect(() => {
    signalingService.connect(SIGNALING_URL);
    pluginRef.current = colaborativoPlugin({
      onMessage: (msg: string) => setChat(c => [...c, `Remoto: ${msg}`]),
      sendMessage: (msg: string) => setChat(c => [...c, `Greg: ${msg}`]),
    });
    signalingService.onMessage = (msg: { type: string; from?: string; offer?: any; answer?: any; candidate?: any }) => {
      if (msg.type === 'offer') {
        if (typeof msg.from === 'string') setConvites(c => [...c, msg.from as string]);
        pluginRef.current.receberOferta(msg.offer, msg.from);
      } else if (msg.type === 'answer') {
        pluginRef.current.receberResposta(msg.answer);
      } else if (msg.type === 'candidate') {
        pluginRef.current.receberCandidate(msg.candidate);
      }
    };
    return () => signalingService.close();
  }, []);

  function enviarConvite() {
    if (usuarioSelecionado && !convites.includes(usuarioSelecionado)) {
      setConvites([...convites, usuarioSelecionado]);
      pluginRef.current.iniciarConexao(usuarioSelecionado);
      setConectado(usuarioSelecionado);
    }
  }

  function aceitarConvite(usuario: string) {
    setConectado(usuario);
    setConvites(convites.filter(u => u !== usuario));
    // Aceita a oferta já recebida via sinalização
  }

  function desconectar() {
    setConectado(null);
    pluginRef.current.desconectar();
    setChat([]);
  }

  function enviarMensagem() {
    if (mensagem && conectado) {
      pluginRef.current.enviarMensagem(mensagem);
      setChat(c => [...c, `Você: ${mensagem}`]);
      setMensagem('');
    }
  }

  return (
    <section className={styles['colab-section']} aria-label="Colaboração Simbiótica">
      <h2 className={styles['colab-title']}>Colaboração Simbiótica</h2>
      {conectado ? (
        <div>
          <p className={styles['colab-center']}><span className={styles['colab-highlight']}>Conectado com <b>{conectado}</b>!</span></p>
          <div className={styles['colab-root']}>
            {chat.map((m, i) => <div key={i} className={styles['colab-fadein']}>{m}</div>)}
          </div>
          <form className={styles['colab-form']} onSubmit={e => {e.preventDefault(); enviarMensagem();}}>
            <input value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Digite uma mensagem..." className={styles['colab-input']} aria-label="Mensagem" />
            <button type="submit" className={styles['colab-btn']}>Enviar</button>
            <button onClick={desconectar} type="button" className={styles['colab-btn'] + ' ' + styles['colab-btn-danger']}>Desconectar</button>
          </form>
        </div>
      ) : (
        <>
          <div className={styles['colab-form'] + ' ' + styles['colab-form-margin']}>
            <label htmlFor="usuario-convidar" className={styles['colab-label']}>Convidar usuário:</label>
            <select id="usuario-convidar" value={usuarioSelecionado} onChange={e => setUsuarioSelecionado(e.target.value)} className={styles['colab-select']} aria-label="Selecionar usuário">
              <option value=''>Selecione</option>
              {mockUsers.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <button onClick={enviarConvite} className={styles['colab-btn']}>Enviar convite</button>
          </div>
          <div>
            <h4 className={styles['colab-center'] + ' ' + styles['colab-highlight']}>Convites recebidos:</h4>
            <ul className={styles['colab-list']}>
              {convites.length === 0 && <li className={styles['colab-center'] + ' ' + styles['colab-muted']}>Nenhum convite.</li>}
              {convites.map(u => (
                <li key={u} className={styles['colab-list-item']}>
                  <b className={styles['colab-title'] + ' ' + styles['colab-title-user']}>{u}</b> <button onClick={() => aceitarConvite(u)} className={styles['colab-btn'] + ' ' + styles['colab-btn-success']}>Aceitar</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {/* Responsividade e animação agora estão no CSS Module */}
    </section>
  );
};

export default ColaborativoPanel;
