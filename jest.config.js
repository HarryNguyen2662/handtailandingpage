/**
 * Jest Testing Configuration
 * ==========================
 *
 * @see https://nextjs.org/docs/architecture/nextjs-compiler#jest
 * @see https://jest-extended.jestcommunity.dev/docs/getting-started/setup
 * @see https://github.com/MichalLytek/type-graphql/blob/master/jest.config.ts
 */

const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  rootDir: "./",
  verbose: false,
  preset: "ts-jest",
  collectCoverage: false,
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  coverageDirectory: "<rootDir>/coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/$1" },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  roots: ["<rootDir>/src", "<rootDir>/src/tests/jest"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/**/*.d.ts"],
  transform: { "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.json" }] },
};

// createJestConfig is exported this way to ensure that
// next/jest can load the nextjs config which is async
module.exports = createJestConfig(customJestConfig);
