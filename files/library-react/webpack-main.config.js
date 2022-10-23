const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: [],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    noErrorOnMissing: true,
                    from: path.resolve('./src/**/*.scss'),
                    to: ({ absoluteFilename }) => {
                        const srcRelative = path.resolve('./src');
                        return absoluteFilename.replace(`${srcRelative}/`, '');
                    },
                },
            ],
        }),
    ],
    entry: {},
};
