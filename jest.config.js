const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Ensure this file exists
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock styles
    "^@/(.*)$": "<rootDir>/$1", // Support absolute imports
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
});
