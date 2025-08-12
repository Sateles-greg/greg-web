/**
 * Secure Logger Utility (Node.js version)
 * Prevents accidental logging of sensitive data in production
 */

const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Sensitive patterns to sanitize from logs
const SENSITIVE_PATTERNS = [
  /Bearer\s+[A-Za-z0-9\-._~+/]+/gi, // JWT tokens
  /sk-[A-Za-z0-9]{48,}/gi, // OpenAI API keys
  /AIza[A-Za-z0-9\-_]{35}/gi, // Google API keys
  /ya29\.[A-Za-z0-9\-_]+/gi, // Google OAuth tokens
  /ghp_[A-Za-z0-9]{36}/gi, // GitHub personal access tokens
  /xoxb-[0-9]{10,13}-[0-9]{10,13}-[A-Za-z0-9]{24}/gi, // Slack tokens
  /password["\s]*[:=]["\s]*[^,}\]]+/gi, // Password fields
  /secret["\s]*[:=]["\s]*[^,}\]]+/gi, // Secret fields
  /token["\s]*[:=]["\s]*[^,}\]]+/gi, // Token fields
  /key["\s]*[:=]["\s]*[^,}\]]+/gi, // Key fields
];

// Environment variables that should never be logged
const SENSITIVE_ENV_VARS = [
  'OPENAI_API_KEY',
  'JWT_SECRET',
  'GOOGLE_APPLICATION_CREDENTIALS',
  'GOOGLE_CLOUD_PROJECT',
  'VITE_OPENAI_API_KEY',
  'HF_API_KEY',
  'VITE_GOOGLE_TRANSLATE_KEY',
  'VITE_GOOGLE_MAPS_KEY',
  'VITE_GREG_GITHUB_TOKEN'
];

/**
 * Sanitizes sensitive data from log messages
 */
function sanitizeLogData(data) {
  if (typeof data === 'string') {
    let sanitized = data;
    SENSITIVE_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });
    return sanitized;
  }

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(sanitizeLogData);
    }

    const sanitized = {};
    Object.keys(data).forEach(key => {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_ENV_VARS.some(envVar => lowerKey.includes(envVar.toLowerCase())) ||
          lowerKey.includes('password') ||
          lowerKey.includes('secret') ||
          lowerKey.includes('token') ||
          lowerKey.includes('key') ||
          lowerKey.includes('auth')) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeLogData(data[key]);
      }
    });
    return sanitized;
  }

  return data;
}

/**
 * Checks if logging should be enabled based on environment
 */
function shouldLog(level) {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  // In production, only log errors and warnings
  if (nodeEnv === 'production') {
    return level === 'error' || level === 'warn';
  }
  
  // In development, log everything
  return true;
}

/**
 * Secure logger class that sanitizes sensitive data
 */
class SecureLogger {
  constructor(prefix = '') {
    this.prefix = prefix;
  }

  formatMessage(level, message, ...args) {
    if (!shouldLog(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const formattedPrefix = this.prefix ? `[${this.prefix}] ` : '';
    const sanitizedArgs = args.map(sanitizeLogData);

    const logMessage = `${timestamp} ${formattedPrefix}${message}`;

    switch (level) {
      case 'error':
        console.error(logMessage, ...sanitizedArgs);
        break;
      case 'warn':
        console.warn(logMessage, ...sanitizedArgs);
        break;
      case 'info':
        console.info(logMessage, ...sanitizedArgs);
        break;
      case 'debug':
        console.log(logMessage, ...sanitizedArgs);
        break;
      default:
        console.log(logMessage, ...sanitizedArgs);
    }
  }

  error(message, ...args) {
    this.formatMessage(LOG_LEVELS.ERROR, message, ...args);
  }

  warn(message, ...args) {
    this.formatMessage(LOG_LEVELS.WARN, message, ...args);
  }

  info(message, ...args) {
    this.formatMessage(LOG_LEVELS.INFO, message, ...args);
  }

  debug(message, ...args) {
    this.formatMessage(LOG_LEVELS.DEBUG, message, ...args);
  }
}

// Utility function to create sanitized error responses for APIs
function sanitizeErrorResponse(error) {
  const sanitizedError = sanitizeLogData(error);
  
  return {
    message: sanitizedError?.message || 'An error occurred',
    details: process.env.NODE_ENV === 'development' 
      ? sanitizedError?.stack || sanitizedError?.details 
      : undefined
  };
}

// Utility to safely log environment info without exposing secrets
function logEnvironmentInfo() {
  const safeEnvInfo = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    // Only log the existence of keys, not their values
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasGoogleCreds: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
    hasJWTSecret: !!process.env.JWT_SECRET
  };
  
  const logger = new SecureLogger('GREG');
  logger.info('Environment configuration loaded', safeEnvInfo);
}

module.exports = {
  SecureLogger,
  sanitizeErrorResponse,
  logEnvironmentInfo,
  sanitizeLogData
};