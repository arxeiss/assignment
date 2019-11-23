module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    },
    NODE_ENV: 'test'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/test/fixtures/'],
  testEnvironment: 'node',
  verbose: true,
  resetMocks: true,
  restoreMocks: true
};
