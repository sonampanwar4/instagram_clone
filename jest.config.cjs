const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",

  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: {
    "^@api-app/(.*)$": "<rootDir>/api-service/src/$1",
    "^@ui-app/(.*)$": "<rootDir>/ui-service/app/$1",
  }
};