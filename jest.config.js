module.exports = {
  preset: 'ts-jest',
  setupFiles: ['./src/utils/mocks/jest.ts'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/?(*.)+(spec|test).(ts|js)',
    '<rootDir>/src/**/?(*.)+(spec|test).(ts|js)',
  ],
}
