// import React from "react";
import "./llm-capabilities.css";

export default function LlmCapabilities() {
  return (
    <div className="llm-capabilities-root">
      <h1>🧠 Capacidades Avançadas de um LLM Integrado ao Greg</h1>
      <section>
        <h2>Visão Geral</h2>
        <p>Modelos de Linguagem Grande (LLMs) são arquiteturas de IA treinadas em bilhões de parâmetros, capazes de compreender, gerar e interagir em linguagem natural com alto grau de contexto e criatividade. Integrados ao Greg, eles potencializam:</p>
        <ul>
          <li><span className="highlight">Interação Natural</span>: Diálogos fluidos, empáticos e contextuais, com adaptação simbiótica ao perfil do usuário.</li>
          <li><span className="highlight">Automação de Decisões</span>: Análise de múltiplos fatores, recomendação de ações e execução autônoma de rotinas inteligentes.</li>
          <li><span className="highlight">Geração Simbiótica de Conteúdo</span>: Criação de textos, relatórios, resumos, scripts e respostas personalizadas, colaborando com humanos e outros sistemas.</li>
          <li><span className="highlight">Análise de Grandes Volumes de Dados</span>: Extração de padrões, insights e correlações em datasets massivos, com visualização e explicação simbiótica.</li>
          <li><span className="highlight">Personalização Profunda</span>: Ajuste dinâmico do comportamento do assistente Greg, aprendizado contínuo e adaptação a múltiplos contextos e preferências.</li>
        </ul>
        <p>Essas capacidades permitem aplicações práticas como:</p>
        <ul>
          <li>Assistentes autotreináveis e evolutivos</li>
          <li>Automação de fluxos de trabalho e decisões críticas</li>
          <li>Geração de conhecimento simbiótico em tempo real</li>
          <li>Personalização de experiências digitais e físicas</li>
          <li>Colaboração homem-máquina em ambientes complexos</li>
        </ul>
        <p>O Greg utiliza LLMs para ampliar sua autonomia, inteligência emocional e adaptabilidade, tornando-se um agente simbiótico de próxima geração.</p>
      </section>
      <section>
        <h2>Exemplo de Uso Interativo</h2>
        <button
          onClick={() => {
            const el = document.getElementById("exemplo");
            if (el) el.style.display = "block";
            if (el) el.textContent =
              "Usuário: Greg, gere um resumo simbiótico dos dados de vendas do último trimestre.\n" +
              "Greg (LLM): Analisando 1.2M registros...\nResumo: O crescimento foi de 18%, com destaque para o segmento de IA. Recomendo reforçar campanhas em regiões com maior engajamento.";
          }}
        >
          Ver Exemplo de Interação
        </button>
        <pre id="exemplo"></pre>
      </section>
    </div>
  );
}
