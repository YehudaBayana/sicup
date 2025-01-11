// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

module.exports = createJestConfig({
  testEnvironment: "jsdom", // Required for testing React components
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Optional for global setups
  moduleNameMapper: {
    // Handle CSS imports (e.g., CSS modules)
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // Handle absolute imports
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest for TypeScript files
  },
});

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
// };
