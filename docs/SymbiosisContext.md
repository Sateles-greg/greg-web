# SymbiosisContext

O `SymbiosisContext` é um contexto React que gerencia os diferentes modos de simbiose no sistema. Ele fornece informações sobre o estado atual e permite alterar o modo com validação e registro de uso.

## Exemplo de Uso

### Consumindo o Contexto

Para acessar o contexto em um componente React, utilize o hook `useContext`:

```tsx
import React, { useContext } from 'react';
import { SymbiosisContext } from '@contexts/SymbiosisContext';

const ExampleComponent = () => {
  const context = useContext(SymbiosisContext);

  if (!context) {
    return <div>Contexto não disponível</div>;
  }

  const { mode, setMode } = context;

  const handleChangeMode = async () => {
    try {
      await setMode('criativo');
      console.log('Modo alterado para criativo');
    } catch (error) {
      console.error('Erro ao alterar o modo:', error);
    }
  };

  return (
    <div>
      <p>Modo atual: {mode}</p>
      <button onClick={handleChangeMode}>Alterar para Criativo</button>
    </div>
  );
};

export default ExampleComponent;
```

### Boas Práticas

1. **Validação de Modos**:

   Utilize a função `isValidSymbiosisMode` para verificar se um modo é válido antes de tentar configurá-lo.

   ```tsx
   import { isValidSymbiosisMode } from '@contexts/SymbiosisContext';

   const modo = 'criativo';
   if (isValidSymbiosisMode(modo)) {
     console.log(`${modo} é um modo válido.`);
   } else {
     console.error(`${modo} não é um modo válido.`);
   }
   ```

2. **Tratamento de Erros**:

   Sempre trate erros ao alterar o modo para garantir que o sistema continue funcionando corretamente.

   ```tsx
   try {
     await setMode('zen');
   } catch (error) {
     console.error('Erro ao alterar o modo:', error);
   }
   ```

3. **Evite Acessos Diretos**:

   Não acesse diretamente propriedades do contexto sem verificar sua disponibilidade.

   ```tsx
   const context = useContext(SymbiosisContext);
   if (!context) {
     console.error('Contexto não disponível');
   }
   ```

4. **Registro de Uso**:

   O `SymbiosisContext` já registra automaticamente o uso de modos. Certifique-se de que o serviço de métricas está configurado corretamente.

## Referência

### Tipos

- **SymbiosisMode**: Representa os diferentes modos disponíveis.

  ```ts
  type SymbiosisMode =
    'zen' |
    'estrategia' |
    'criativo' |
    'emocional' |
    'noturno' |
    'foco' |
    'expansao' |
    'reparo' |
    'sombra' |
    'guardiao' |
    'offline';
  ```

- **SymbiosisContextValue**: Interface que define o valor do contexto.

  ```ts
  interface SymbiosisContextValue {
    gregState: GregState;
    setMode: (mode: SymbiosisMode) => Promise<void>;
    mode: SymbiosisMode;
    status: string;
    usoTotal: number;
    lastAnalysis: string;
  }
  ```

### Funções

- **isValidSymbiosisMode**:

  Verifica se uma string é um modo válido.

  ```ts
  const isValidSymbiosisMode = (mode: string): mode is SymbiosisMode => {
    return [
      'zen',
      'estrategia',
      'criativo',
      'emocional',
      'noturno',
      'foco',
      'expansao',
      'reparo',
      'sombra',
      'guardiao',
      'offline',
    ].includes(mode);
  };
  ```
