export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.(ts|tsx)$": "babel-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!@babel/runtime)"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
    extensionsToTreatAsEsm: ['.ts']
};