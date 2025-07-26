# Plugins Simbióticos do Greg

Este diretório é dedicado a módulos/plugins que expandem as capacidades do Greg sem alterar o núcleo.

## Como funciona
- Cada plugin é um arquivo TypeScript/JavaScript exportando uma função ou classe padrão.
- O Greg pode detectar, sugerir e carregar plugins automaticamente.
- Plugins podem acessar o contexto simbiótico, sensores, memória e emitir eventos.

## Exemplo de plugin
```ts
// plugins/motivacional.ts
export default function ativarMotivacional(context) {
  context.addMemory('Frases motivacionais ativadas!');
  // ...pode alterar modos, emitir sugestões, etc.
}
```

## Como criar seu plugin
1. Crie um arquivo em `src/plugins/`.
2. Exporte uma função padrão.
3. Use o contexto simbiótico para interagir com o Greg.

## Futuro
- Plugins poderão ser instalados via interface ou marketplace simbiótico.
- Greg poderá sugerir plugins conforme padrões de uso.
