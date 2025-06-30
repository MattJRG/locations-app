const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',

  // Make sure ts-jest handles TS files
  transform: {
    ...tsJestTransformCfg,
  },

  // Recognize TypeScript + Angular file types
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  // Optional: skip transforms for non-code files
  moduleNameMapper: {
    '\\.(scss|css|html)$': 'identity-obj-proxy',
  },

  // Optional: improve test file matching
  testMatch: ['**/+(*.)+(spec).+(ts)'],

  // Optional: coverage config
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
};
