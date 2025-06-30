/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|tsx|js|mjs)$': ['ts-jest', { useESM: true }],
  },

  moduleFileExtensions: ['ts', 'js', 'json', 'html', 'mjs'],

  moduleNameMapper: {
    '\\.(scss|css|html)$': 'identity-obj-proxy',
  },

  testMatch: ['**/?(*.)+(spec|test).ts'],

  transformIgnorePatterns: [
    'node_modules/(?!(rxjs|@angular|@ngrx|@ngneat|ngx-toastr)/)',
  ],

  extensionsToTreatAsEsm: ['.ts'],
};
