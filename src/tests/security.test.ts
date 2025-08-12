/**
 * Security Tests - Validate that sensitive data is not exposed
 */

import { sanitizeLogData, SecureLogger } from '../utils/secureLogger';
import { secureGregAI } from '../services/secureGregAI';

describe('Security: Sensitive Data Protection', () => {
  describe('Log Sanitization', () => {
    it('should sanitize OpenAI API keys in logs', () => {
      const sensitiveData = 'API Key: sk-1234567890abcdef1234567890abcdef1234567890abcdef';
      const sanitized = sanitizeLogData(sensitiveData);
      expect(sanitized).toBe('API Key: [REDACTED]');
    });

    it('should sanitize Google API keys in logs', () => {
      const sensitiveData = 'Google Key: AIzaSyDxVlAhMU3DYN7zE-E-KHpAXRdGjHnBxYc';
      const sanitized = sanitizeLogData(sensitiveData);
      expect(sanitized).toBe('Google Key: [REDACTED]');
    });

    it('should sanitize JWT tokens in logs', () => {
      const sensitiveData = 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';
      const sanitized = sanitizeLogData(sensitiveData);
      expect(sanitized).toBe('Authorization: [REDACTED]');
    });

    it('should sanitize sensitive object properties', () => {
      const sensitiveObject = {
        username: 'user',
        password: 'secret123',
        apiKey: 'sk-abcdef',
        publicData: 'safe'
      };
      const sanitized = sanitizeLogData(sensitiveObject);
      expect(sanitized).toEqual({
        username: 'user',
        password: '[REDACTED]',
        apiKey: '[REDACTED]',
        publicData: 'safe'
      });
    });

    it('should sanitize nested sensitive data', () => {
      const nestedData = {
        config: {
          openai: {
            apiKey: 'sk-secret',
            model: 'gpt-4'
          }
        },
        user: 'test'
      };
      const sanitized = sanitizeLogData(nestedData);
      expect(sanitized.config.openai.apiKey).toBe('[REDACTED]');
      expect(sanitized.config.openai.model).toBe('gpt-4');
      expect(sanitized.user).toBe('test');
    });
  });

  describe('Secure Logger', () => {
    let originalConsole: typeof console;
    let mockConsole: any;

    beforeEach(() => {
      originalConsole = console;
      mockConsole = {
        log: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
      };
      global.console = mockConsole;
    });

    afterEach(() => {
      global.console = originalConsole;
    });

    it('should not log debug messages in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const logger = new SecureLogger('TEST');
      logger.debug('Debug message');

      expect(mockConsole.log).not.toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('should log error messages in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const logger = new SecureLogger('TEST');
      logger.error('Error message');

      expect(mockConsole.error).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('should sanitize sensitive data in log messages', () => {
      const logger = new SecureLogger('TEST');
      logger.info('User logged in', { 
        username: 'test', 
        password: 'secret',
        apiKey: 'sk-test123'
      });

      expect(mockConsole.info).toHaveBeenCalledWith(
        expect.stringContaining('[TEST] User logged in'),
        expect.objectContaining({
          username: 'test',
          password: '[REDACTED]',
          apiKey: '[REDACTED]'
        })
      );
    });
  });

  describe('Secure Greg AI Service', () => {
    it('should not expose API keys in error messages', async () => {
      // Mock fetch to simulate network error
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      try {
        await secureGregAI.analisarSentimento('test text');
      } catch (error) {
        expect(error.message).not.toContain('sk-');
        expect(error.message).not.toContain('Bearer');
        expect(error.message).toBe('Network error or service unavailable');
      }
    });

    it('should handle missing parameters safely', async () => {
      await expect(secureGregAI.analisarSentimento('')).rejects.toThrow('Text is required');
      await expect(secureGregAI.simularDecisao('')).rejects.toThrow('Action is required');
      await expect(secureGregAI.triagemClinicaIA('', 'symptoms')).rejects.toThrow('History and symptoms are required');
    });

    it('should return safe fallbacks for emotion analysis', async () => {
      const result = await secureGregAI.analisarEmocao('');
      expect(result).toBe('neutro');
    });
  });

  describe('Environment Variable Security', () => {
    it('should not expose sensitive environment variables', () => {
      const sensitiveEnvVars = [
        'OPENAI_API_KEY',
        'JWT_SECRET',
        'GOOGLE_APPLICATION_CREDENTIALS',
        'VITE_OPENAI_API_KEY'
      ];

      // Simulate environment variables
      const mockEnv = {};
      sensitiveEnvVars.forEach(varName => {
        mockEnv[varName] = 'sensitive-value';
      });

      const sanitized = sanitizeLogData(mockEnv);
      
      sensitiveEnvVars.forEach(varName => {
        expect(sanitized[varName]).toBe('[REDACTED]');
      });
    });
  });

  describe('Frontend API Key Protection', () => {
    it('should not have direct access to OpenAI API keys in frontend code', () => {
      // This test ensures that process.env.OPENAI_API_KEY is not accessible in frontend
      // In a properly configured frontend, this should be undefined
      const frontendApiKey = typeof window !== 'undefined' ? process.env.OPENAI_API_KEY : undefined;
      expect(frontendApiKey).toBeUndefined();
    });

    it('should only access VITE_ prefixed environment variables in frontend', () => {
      // Only VITE_ prefixed variables should be available in frontend
      const allowedViteVars = ['VITE_API_URL'];
      const sensitiveVars = ['OPENAI_API_KEY', 'JWT_SECRET', 'GOOGLE_APPLICATION_CREDENTIALS'];
      
      // In frontend context, sensitive vars should not be accessible
      if (typeof window !== 'undefined') {
        sensitiveVars.forEach(varName => {
          expect(process.env[varName]).toBeUndefined();
        });
      }
    });
  });
});