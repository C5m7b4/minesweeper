/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  thresholds: { high: 90, low: 88, break: 85 },
  coverageAnalysis: 'perTest',
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)',
  ],
};
