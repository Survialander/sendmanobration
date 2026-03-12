const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = createJestConfig({
  testTimeout: 60000,
  moduleDirectories: ["node_modules", "<rootDir>"],
});

require("dotenv").config({ path: ".env.development" });

module.exports = jestConfig;
