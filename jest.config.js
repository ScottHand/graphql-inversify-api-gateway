module.exports = {
  clearMocks: true,
  moduleDirectories: [
    "src",
    "node_modules",
  ],
  modulePaths: [
    "<rootDir>/__tests__/unit",
  ],
  preset: "ts-jest",
  roots: [
    "<rootDir>/__tests__/unit",
  ],
  testEnvironment: "node",
  verbose: true,
};
