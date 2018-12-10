const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        devtool: 'source-map',
        entry: "./src/index.js",
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "bundle.js"
        },
        devServer: { historyApiFallback: true },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                            extends: path.join(__dirname + '/.babelrc'),
                            cacheDirectory: true
                        }
                    }
                }, {
                    // test: /\.css$/,
                    // use: ExtractTextPlugin.extract({
                    //     fallback: 'style-loader',
                    //     use: ['css-loader']
                    // })
                    test:/\.(s*)css$/,
                    use:['style-loader','css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader'
                    }]
                }, {
                    test: /\.svg$/,
                    loaders: [
                        'babel-loader',
                        {
                            loader: 'react-svg-loader',
                            query: {
                                jsx: true
                            }
                        },
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                hash: true,
                filename: "index.html", //target html
                template: "./public/index.html" //source html
            }),
            new ExtractTextPlugin({
                filename: 'css/style.css'
            }),
            new webpack.DefinePlugin(envKeys),
            // new CopyWebpackPlugin([
            //     // relative path is from src
            //     { from: './src/assets/images/favicon.png', to: 'assets/images/favicon.png' }, // <- your path to favicon
            //   ])
        ]
    }
}