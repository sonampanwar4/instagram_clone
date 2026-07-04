module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },

  modulePathIgnorePatterns: ["<rootDir>/api-service/build"]
};