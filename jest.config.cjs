// jest.config.cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  modulePaths: ["<rootDir>/src"],
  roots: ["<rootDir>/src"],
};
