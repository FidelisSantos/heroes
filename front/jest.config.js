export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.app.json" }]
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
