const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: "server",
    entry: [path.join(CURRENT_WORKING_DIR, './server/server.js')],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'server.generated.js',
        publicPath: '/dist/',
        libraryTarget: 'commonjs2', // Corrección en el nombre 'commonjs2'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    },
    plugins: [new Dotenv({
        path: './.env',

        prefix: 'import.meta.env.',
    })], // Corrección en la propiedad 'plugins'
};

module.exports = config;
