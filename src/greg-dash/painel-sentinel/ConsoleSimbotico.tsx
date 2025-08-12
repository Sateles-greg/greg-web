
import { registrarSimbiotico } from '../../services/memoriaSimbioticaAvancada';
import { useGregAI } from '../../agents/greg-ai/useGregAI';
import { triagemClinicaIA } from '../../services/secureGregAI';
import { coletarDadosBiometricos } from '../../services/biometriaService';
import { useState } from 'react';

export default function ConsoleSimbotico() {
  const { simular } = useGregAI();
  const [resultado, setResultado] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [tipoRegistro, setTipoRegistro] = useState<'crenca' | 'principio' | 'aprendizado'>('crenca');
  const [conteudoRegistro, setConteudoRegistro] = useState<string>('');

  const registrarMemoria = () => {
    registrarSimbiotico({ tipo: tipoRegistro, conteudo: conteudoRegistro, data: new Date().toISOString() });
    setResultado('Memória simbiótica registrada!');
    setConteudoRegistro('');
  };

  const testarSimulacao = async () => {
    const res = await simular(input || 'conectar Greg à IA da OpenAI');
    setResultado(JSON.stringify(res));
  };

  const testarTriagem = async () => {
    const historico = 'Sono irregular, ansiedade, produtividade baixa';
    const sintomas = 'Cansaço, insônia, irritabilidade';
    const res = await triagemClinicaIA(historico, sintomas);
    setResultado(JSON.stringify(res));
  };

  const testarBiometria = async () => {
    const res = await coletarDadosBiometricos();
    setResultado(JSON.stringify(res));
  };

  return (
    <div>
      <h3>Console Simbiótico</h3>

      {/* Bloco de registro simbiótico */}
      <div className="console-simbotico-memoria">
        <select title="Tipo de registro simbiótico" value={tipoRegistro} onChange={e => setTipoRegistro(e.target.value as any)}>
          <option value="crenca">Crença</option>
          <option value="principio">Princípio</option>
          <option value="aprendizado">Aprendizado</option>
        </select>
        <input value={conteudoRegistro} onChange={e => setConteudoRegistro(e.target.value)} placeholder="Conteúdo simbiótico" />
        <button onClick={registrarMemoria}>Registrar memória simbiótica</button>
      </div>

      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Digite uma ação ou decisão" />
      <button onClick={testarSimulacao}>Simular decisão GregAI</button>
      <button onClick={testarTriagem}>Triagem clínica IA</button>
      <button onClick={testarBiometria}>Coletar biometria</button>
      <pre>{resultado}</pre>
    </div>
  );
}
