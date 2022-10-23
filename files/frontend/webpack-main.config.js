const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const LicenseWebpackPlugin =
    require('license-webpack-plugin').LicenseWebpackPlugin;

const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopmentMode = process.env.NODE_ENV !== 'production';

module.exports = async () => {
    const shouldUseHash = false;
    const localIdentName = '[local]';
    const bundleName = 'bundle';
    const cssName = 'main';
    const outputDirectory = 'dist';

    return {
        mode: isDevelopmentMode ? 'development' : 'production',
        watch: isDevelopmentMode,
        devtool: isDevelopmentMode ? 'inline-source-map' : false,
        resolve: {
            /*
            Resolve react from local node_modules. Useful for when running
            yarn link to link a local react package
            https://stackoverflow.com/a/31170775
            */
            alias: isDevelopmentMode
                ? {
                      react: path.resolve('./node_modules/react'),
                  }
                : undefined,
            extensions: ['.ts', '.tsx', '.js', '.scss'],
        },
        output: {
            filename: shouldUseHash
                ? `${bundleName}.[contenthash].js`
                : `${bundleName}.js`,
            path: path.resolve(outputDirectory),
        },
        optimization: {
            usedExports: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    //exclude: /node_modules\/(?!(YOUR_REGEX)\/).*/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
                {
                    test: /\.(tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName,
                                },
                                sourceMap: isDevelopmentMode,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopmentMode,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new LicenseWebpackPlugin({
                outputFilename: `${bundleName}.js.LICENSE.txt`,
                skipChildCompilers: true,
                //Ignore licenses for specific modules, used for own packages
                /*excludedPackageTest: (packageName) =>
                    packageName.startsWith('YOUR_ORG_PREFIX'),*/
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.resolve('dist-report/report.html'),
                openAnalyzer: false,
            }),
            new MiniCssExtractPlugin({
                filename: shouldUseHash
                    ? `${cssName}.[contenthash].css`
                    : `${cssName}.css`,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve('./public/static'), to: 'public' },
                ],
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['main'],
                template: path.resolve(__dirname, './public/index.html'),
            }),
        ],
        devServer: {
            contentBase: path.resolve(outputDirectory),
            port: 8081,
        },
        entry: {
            main: path.resolve(__dirname, './src/index.tsx'),
        },
    };
};
