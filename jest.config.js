export default {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
  ],
};
