// Jest configuration
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@services/(.*)$': '<rootDir>/services/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
