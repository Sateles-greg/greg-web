// import React from 'react'; // Removido: não utilizado
import { render } from '@testing-library/react';
import PainelMonitoramento from './PainelMonitoramento';
it('renderiza painel de monitoramento', () => {
  render(<PainelMonitoramento />);
  // Verifique renderização
});
