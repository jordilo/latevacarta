const esModules = ["lodash"].join("|");

module.exports = {
  moduleNameMapper: {
    "@core/(.*)": "<rootDir>/src/app/core/$1",
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  verbose: false,
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      // statements: -10,
    },
  },
};
