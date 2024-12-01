

const config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Use Node.js as the test environment
  // roots: ['<rootDir>/src'], // Define the root folder for tests
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize these extensions
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
  collectCoverage: true, // Collect test coverage information
  coverageDirectory: 'coverage', // Specify the coverage output folder
  coverageReporters: ['text', 'lcov'], // Coverage formats
  moduleNameMapper: {
    // Map module paths for testing
    '^@/(.*)$': '<rootDir>/src/$1',
    'vscode': '<rootDir>/node_modules/vscode',
  },
  verbose: true
};

export {config}
