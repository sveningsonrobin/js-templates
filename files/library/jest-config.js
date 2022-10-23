module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'tests/.coverage',
    coverageReporters: ['lcov', 'text', 'json-summary'],
    rootDir: './',
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    //Ignore specific modules for transform, used for own packages
    //transformIgnorePatterns: ['<rootDir>/node_modules/(?!YOUR_REGEX)'],
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
    },
};
