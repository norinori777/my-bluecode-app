const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpckPlugin = require('html-webpack-plugin');


module.exports = {
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
        new HtmlWebpckPlugin({
            template: './public/index.html',
            filename: '../index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        })
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