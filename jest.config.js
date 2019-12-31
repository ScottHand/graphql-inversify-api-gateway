module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "incontrol-shared-library": "<rootDir>/test/unit/globalModuleMocks/incontrol-shared-library-mock.ts",
  },
  preset: "ts-jest",
  modulePaths: [
    "<rootDir>",
  ],
  roots: [
    "<rootDir>/test",
  ],
  testEnvironment: "node",
  verbose: true,
};
