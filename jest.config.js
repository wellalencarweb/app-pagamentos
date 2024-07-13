const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");
module.exports = {
    roots: ["<rootDir>/src", "<rootDir>/tests"],
    transform: {
        ".*\\.ts$": "ts-jest",
    },
    collectCoverageFrom: [
        "!**/interfaces/**",
        "!**/external/**",
        "!**/api/{routes,docs}/**",
        "!**/api/middlewares/{index}.ts",
        "!**/api/{index,server}.ts",
        "!**/config/**",
        "!**/utils/{requestLogger,statusCode}.ts",
        "!**/utils/errors/**",
        "!**/gateways/**",
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src",
    }),
    modulePaths: ["<rootDir>/src", "<rootDir>/tests"],
    testRegex: "tests/.*\\.(test|spec)\\.ts$",
    moduleFileExtensions: ["ts", "js", "json", "node"],
    testEnvironment: "node",
};