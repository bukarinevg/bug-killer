const path = require('path');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@config': path.resolve(__dirname, 'src/config/'),
            '@scenes': path.resolve(__dirname, 'src/scenes/'),
            '@services': path.resolve(__dirname, 'src/services/'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces/'),
            '@default': path.resolve(__dirname, 'src/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@managers': path.resolve(__dirname, 'src/managers/'),
        }
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    mode: 'development',
};