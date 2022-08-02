const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: [".cypress", "node_modules"],
  testEnvironment: "jest-environment-jsdom",
};
