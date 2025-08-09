import React, { useState, useRef } from 'react';
import { obterRespostaIA, IaResposta } from '../../services/iaCentralService';
import { t, Lang } from '../i18n/index';
import styles from './ChatPanel.module.css';

// Modo de chat: IA (default) ou colaborativo (P2P)
type ChatMode = 'ia' | 'colaborativo';

type ChatMessage = {
  text: string;
  sender: 'user' | 'ia' | 'colab';
  timestamp: number;
  origem?: string;
};

const mockUsers = ['Greg-Alpha', 'Greg-Beta', 'Greg-Gamma'];

const ChatPanel: React.FC<{ lang?: Lang }> = ({ lang = 'pt' }) => {
  const [mode, setMode] = useState<ChatMode>('ia');
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [colabUser, setColabUser] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Envia mensagem para IA
  async function sendToIA() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    const userMsg: ChatMessage = { text: input, sender: 'user', timestamp: Date.now() };
    setChat(c => [...c, userMsg]);
    setInput('');
    try {
      const resposta: IaResposta = await obterRespostaIA(input, 'Foco');
      setChat(c => [...c, { text: resposta.result, sender: 'ia', timestamp: Date.now(), origem: resposta.origem }]);
      if (resposta.origem === 'erro') setError(resposta.result);
    } catch (e: any) {
      setError(e?.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  // Simula envio colaborativo (P2P)
  function sendToColab() {
    if (!input.trim() || !colabUser) return;
    setChat(c => [...c, { text: input, sender: 'user', timestamp: Date.now() }]);
    setTimeout(() => {
      setChat(c => [...c, { text: t('resposta_colab', lang), sender: 'colab', timestamp: Date.now() }]);
    }, 1200);
    setInput('');
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'ia') sendToIA();
    else sendToColab();
  }

  return (
    <section className={styles.chatSection} aria-label={t('painel_chat', lang)}>
      <h2 className={styles.chatTitle}>{t('painel_chat', lang)}</h2>
      <div className={styles.modeSwitch}>
        <button
          className={mode === 'ia' ? styles.active : ''}
          onClick={() => setMode('ia')}
          aria-pressed={mode === 'ia'}
        >{t('modo_ia', lang)}</button>
        <button
          className={mode === 'colaborativo' ? styles.active : ''}
          onClick={() => setMode('colaborativo')}
          aria-pressed={mode === 'colaborativo'}
        >{t('modo_colab', lang)}</button>
      </div>
      {mode === 'colaborativo' && (
        <div className={styles.colabSelect}>
          <label htmlFor="colab-user">{t('selecionar_usuario', lang)}:</label>
          <select id="colab-user" value={colabUser} onChange={e => setColabUser(e.target.value)}>
            <option value="">{t('selecione', lang)}</option>
            {mockUsers.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      )}
      <div className={styles.chatHistory}>
        {chat.length === 0 && <div className={styles.empty}>{t('sem_mensagens', lang)}</div>}
        {chat.map((msg, i) => (
          <div key={i} className={styles[msg.sender]}>
            <span className={styles.time}>{new Date(msg.timestamp).toLocaleTimeString(lang === 'pt' ? 'pt-BR' : 'en-US', {hour:'2-digit',minute:'2-digit'})}</span>
            <span className={styles.text}>{msg.text}</span>
            {msg.origem && <span className={styles.origem}>({msg.origem})</span>}
          </div>
        ))}
        {loading && <div className={styles.ia}>{t('carregando', lang)}</div>}
      </div>
      <form className={styles.chatForm} onSubmit={handleSend} autoComplete="off">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('digite_mensagem', lang)}
          aria-label={t('mensagem', lang)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || (mode === 'colaborativo' && !colabUser)}>{t('enviar', lang)}</button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      <details className={styles.exemplos}>
        <summary>{t('exemplos_prompt', lang)}</summary>
        <ul>
          <li>{t('exemplo1', lang)}</li>
          <li>{t('exemplo2', lang)}</li>
          <li>{t('exemplo3', lang)}</li>
        </ul>
      </details>
    </section>
  );
};

export default ChatPanel;
