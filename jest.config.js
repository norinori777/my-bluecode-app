module.exports = {
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testEnvironment: "jest-environment-jsdom",
    transform: { "^.+\\.(ts|tsx)$": ["esbuild-jest", { sourcemap: true }] },
}