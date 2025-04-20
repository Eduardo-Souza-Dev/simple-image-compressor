/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: "node",
    testPathIgnorePatterns: ["<rootDir>/src/__test__/utils"],
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
      "^.+.tsx?$": ["ts-jest",{}],
    },
  };