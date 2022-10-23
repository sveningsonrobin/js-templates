const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.resolve('dist-report/report.html'),
            openAnalyzer: false,
        }),
    ],
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
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
