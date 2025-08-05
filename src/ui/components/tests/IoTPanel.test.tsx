// import React from 'react'; // Removido: não utilizado
import { render } from '@testing-library/react';
import IoTPanel from '../IoTPanel';

describe('IoTPanel', () => {
  it('renderiza corretamente', () => {
    const { container } = render(<IoTPanel />);
    expect(container).toBeInTheDocument();
  });
});
