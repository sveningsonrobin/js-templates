const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/dev.ts',
    target: 'node',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [
        nodeExternals({
            //Add list of allowed packages that should be bundled (used for private packages)
            allowlist: [],
        }),
    ],
    externalsPresets: {
        node: true,
    },
    output: {
        filename: 'dev.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
