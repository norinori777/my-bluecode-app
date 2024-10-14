const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpckPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    watch: true,
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx', '.css', '.json'],
    },
    plugins: [
        // index.htmlファイルにbundle.jsやCSSを埋め込むためのプラグイン
        new HtmlWebpckPlugin({
            template: './public/index.html',
            filename: '../index.html'
        }),
        // CSSファイルを出力するためのプラグイン
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        }),
        // バンドルサイズを可視化するためのプラグイン
        new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            }
        ]
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    }
};