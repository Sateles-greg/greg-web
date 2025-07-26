jest.mock('../../services/nlpSimbioService', () => ({
  analisarTexto: jest.fn(() => Promise.resolve('Texto analisado mockado!')),
  respostaSimbio: jest.fn(() => Promise.resolve('Resposta simbiótica mockada!')),
  inicializarNLP: jest.fn(() => {}),
}));
jest.mock('../../services/notificacaoSimbioService', () => ({
  enviarNotificacaoSimbiotica: jest.fn(() => Promise.resolve()),
}));
import { render, screen, fireEvent, act } from '@testing-library/react';
import dotenv from 'dotenv';
// import React from 'react';
dotenv.config();
import DashboardCentral from '../DashboardCentral';
jest.mock('../../services/inovacaoGenerativaService', () => ({
  gerarIdeiaInovadora: jest.fn(() => Promise.resolve('Ideia mockada!'))
}));
jest.mock('../../services/inovacaoSimbioService', () => ({
  sugerirInovacao: jest.fn(() => Promise.resolve('Sugestão mockada!'))
}));
jest.mock('../../services/traducaoAutomaticaService', () => ({
  traduzirTexto: jest.fn(() => Promise.resolve('Hello, world!')),
}));
jest.mock('../../services/integracaoGoogleService', () => {
  const actual = jest.requireActual('../../services/integracaoGoogleService');
  return {
    ...actual,
    traduzirGoogle: jest.fn(() => Promise.resolve('Hello, world!')),
    obterRotaGoogle: jest.fn(() => Promise.resolve('Rota mockada')),
  };
});
jest.mock('../../services/integracaoHuggingFaceService', () => ({
  analisarSentimento: jest.fn(() => Promise.resolve({ sentimento: 'positivo' })),
}));
jest.mock('../../services/diagnosticoMedicoInteligenteService', () => ({
  gerarAlertaDiagnostico: jest.fn(() => Promise.resolve('Diagnóstico simulado')),
}));
describe('DashboardCentral - Ações do Relatório', () => {
  it('deve lidar com erro ao enviar notificação', async () => {
    const spy = jest.spyOn(require('../../services/notificacaoSimbioService'), 'enviarNotificacaoSimbiotica').mockImplementation(() => { throw new Error('Falha ao notificar'); });
    window.alert = jest.fn();
    await act(async () => {
      render(<DashboardCentral />);
    });
    const btn = screen.getByText('Notificar');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(window.alert).toHaveBeenCalledWith('Erro ao enviar notificação');
    spy.mockRestore();
  });
  it('deve lidar com erro ao auditar relatório', async () => {
    const spy = jest.spyOn(require('../../services/auditoriaSimbioService'), 'auditarRelatorio').mockImplementation(() => { throw new Error('Falha na auditoria'); });
    window.alert = jest.fn();
    await act(async () => {
      render(<DashboardCentral />);
    });
    const btn = screen.getByText('Auditar Relatório');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(window.alert).toHaveBeenCalledWith('Erro ao auditar relatório');
    spy.mockRestore();
  });
  it('deve lidar com erro ao exportar relatório', async () => {
    const spy = jest.spyOn(require('../../services/exportacaoRelatorioService'), 'exportarRelatorioJSON').mockImplementation(() => { throw new Error('Falha na exportação'); });
    // Suprimir alert do jsdom
    window.alert = jest.fn();
    await act(async () => {
      render(<DashboardCentral />);
    });
    const btn = screen.getByText('Exportar JSON');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(window.alert).toHaveBeenCalledWith('Erro ao exportar relatório');
    spy.mockRestore();
  });
  it('deve exportar o relatório em JSON ao clicar no botão', async () => {
    // Mock da função de exportação
    const spy = jest.spyOn(require('../../services/exportacaoRelatorioService'), 'exportarRelatorioJSON').mockImplementation(() => {});
    await act(async () => {
      render(<DashboardCentral />);
    });
    const btn = screen.getByText('Exportar JSON');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('deve auditar o relatório ao clicar no botão', async () => {
    const spy = jest.spyOn(require('../../services/auditoriaSimbioService'), 'auditarRelatorio').mockImplementation(() => 'Auditado!');
    await act(async () => {
      render(<DashboardCentral />);
    });
    const btn = screen.getByText('Auditar Relatório');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('deve enviar notificação ao clicar no botão', async () => {
    const { enviarNotificacaoSimbiotica } = require('../../services/notificacaoSimbioService');
    const DashboardCentral = require('../DashboardCentral').default;
    await act(async () => {
      render(<DashboardCentral />);
    });
    const btn = screen.getByText('Notificar');
    await act(async () => {
      fireEvent.click(btn);
    });
    expect(enviarNotificacaoSimbiotica).toHaveBeenCalledWith('Relatório Greg', expect.any(String));
  });
});
