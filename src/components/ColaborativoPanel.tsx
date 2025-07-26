import React, { useState, useEffect, useRef } from 'react';
import colaborativoPlugin from '../plugins/colaborativo';
import signalingService from '../services/signalingService';

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
    signalingService.onMessage = (msg: any) => {
      if (msg.type === 'offer') {
        setConvites(c => [...c, msg.from]);
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
    <section
      style={{
        marginTop: '2rem',
        background: 'linear-gradient(120deg, #e3f2fd 0%, #fff 100%)',
        borderRadius: 18,
        padding: 24,
        boxShadow: '0 4px 32px #00bcd433',
        maxWidth: 480,
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'box-shadow 0.3s',
      }}
      aria-label="Colaboração Simbiótica"
    >
      <h2 style={{textAlign:'center', fontWeight:700, color:'#00bcd4', letterSpacing:1}}>Colaboração Simbiótica</h2>
      {conectado ? (
        <div>
          <p style={{textAlign:'center', color:'#0097a7', fontWeight:600}}>Conectado com <b>{conectado}</b>!</p>
          <div style={{background:'#fff', borderRadius:8, padding:10, minHeight:80, marginBottom:8, boxShadow:'0 1px 6px #00bcd422', maxHeight:160, overflowY:'auto'}}>
            {chat.map((m, i) => <div key={i} style={{animation:'fadeIn 0.5s'}}>{m}</div>)}
          </div>
          <form style={{display:'flex', gap:8, alignItems:'center', justifyContent:'center'}} onSubmit={e => {e.preventDefault(); enviarMensagem();}}>
            <input value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Digite uma mensagem..." style={{flex:1, minWidth:120, padding:6, borderRadius:6, border:'1px solid #b2ebf2', background:'#f0fcff'}} aria-label="Mensagem" />
            <button type="submit" style={{background:'linear-gradient(90deg, #00bcd4 60%, #0097a7 100%)', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, boxShadow:'0 2px 8px #00bcd422', cursor:'pointer', transition:'background 0.2s, transform 0.1s'}} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>Enviar</button>
            <button onClick={desconectar} type="button" style={{background:'linear-gradient(90deg, #f44336 60%, #c62828 100%)', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, boxShadow:'0 2px 8px #f4433622', cursor:'pointer', marginLeft:8, transition:'background 0.2s, transform 0.1s'}} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>Desconectar</button>
          </form>
        </div>
      ) : (
        <>
          <div style={{marginBottom:12, display:'flex', alignItems:'center', gap:8, justifyContent:'center'}}>
            <label htmlFor="usuario-convidar" style={{fontWeight:500}}>Convidar usuário:</label>
            <select id="usuario-convidar" value={usuarioSelecionado} onChange={e => setUsuarioSelecionado(e.target.value)} style={{padding:6, borderRadius:6, border:'1px solid #b2ebf2', background:'#f0fcff'}} aria-label="Selecionar usuário">
              <option value=''>Selecione</option>
              {mockUsers.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <button onClick={enviarConvite} style={{background:'linear-gradient(90deg, #00bcd4 60%, #0097a7 100%)', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, boxShadow:'0 2px 8px #00bcd422', cursor:'pointer', transition:'background 0.2s, transform 0.1s'}} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>Enviar convite</button>
          </div>
          <div>
            <h4 style={{textAlign:'center', color:'#0097a7', fontWeight:600}}>Convites recebidos:</h4>
            <ul style={{listStyle:'none', padding:0, margin:0}}>
              {convites.length === 0 && <li style={{textAlign:'center', color:'#b0bec5', fontStyle:'italic', marginTop:12}}>Nenhum convite.</li>}
              {convites.map(u => (
                <li key={u} style={{marginBottom:8, background:'#e0f7fa', borderRadius:8, padding:8, display:'flex', alignItems:'center', justifyContent:'space-between', animation:'fadeIn 0.5s'}}>
                  <b style={{color:'#00bcd4'}}>{u}</b> <button onClick={() => aceitarConvite(u)} style={{background:'linear-gradient(90deg, #4caf50 60%, #388e3c 100%)', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, boxShadow:'0 2px 8px #4caf5022', cursor:'pointer', transition:'background 0.2s, transform 0.1s', marginLeft:8}} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>Aceitar</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <style>{`
        @media (max-width: 600px) {
          section[aria-label="Colaboração Simbiótica"] {
            padding: 10px !important;
            max-width: 98vw !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ColaborativoPanel;
