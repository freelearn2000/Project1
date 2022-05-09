module.exports = async () => {
    return {
        "preset": "ts-jest",
        "testEnvironment": "node",
        "testMatch": [
            "**/?(*.)+(test).ts",
            "!**/config/**",
            "!**/index.ts",
            "!**/server.ts"
        ],
        "verbose": true,
        "collectCoverageFrom": [
            "**/*.ts",
            "!**/index.ts",
            "!**/server.ts",
            "!**/typeorm.config.ts",
            "!**/src/models/**",
            "!**/src/middlewares/**",
            "!**/src/shared/**",
            "!**/config/**"
        ],
        "coverageThreshold": {
            "global": {
                "functions": 50,
                "statements": 50,
                "branches": 25,
                "lines": 50
            }
        },
        "coverageReporters": [
            "html"
        ],
        "coverageDirectory": "./reports/coverage",
        "testResultsProcessor": "./node_modules/jest-html-reporter"

    }
}