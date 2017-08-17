const path              = require('path');
const Util              = require('./Utils');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss       = new ExtractTextPlugin('style/[name].css');

exports.loader =  [

        {
            test: /\.vue/,
            loader: "vue-loader",
            exclude: /node_modules/,
            include : Util.resolve('../src'),
            options: {
                loaders: {
                    // 这里把vue里面的scss,css统一捡出
                    scss  : extractCss.extract({ use: ['css-loader' , 'sass-loader'] }),
                    css   : extractCss.extract({ use: ['css-loader'] })
                }
            }
        },

        {
            test: /\.pug$/,
            loader: "pug-loader",
            options: {
                pretty : Util.isDev(),              //只有在dev开发环境下启用
            },
        },


        {
            test: /\.jsx?$/,
            loader: "babel-loader?cacheDirectory=true" ,
            exclude: /node_modules/,
            include : [Util.resolve('../src')],
        },

        {
            test: /\.css$/,
            loader: extractCss.extract({
                use: [
                    'css-loader' ,
                    {
                        loader : 'postcss-loader',
                        options : {
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('autoprefixer')(),
                            ]
                        }
                    },
                ],
            })
        },

        {
            test: /\.scss$/,
            loader: extractCss.extract({
                use: [
                    'css-loader' ,
                    {
                        loader : 'postcss-loader',
                        options : {
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    'sass-loader'
                ],
                // dev use style-loader
                fallback: "style-loader"
            })
        },

        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        name : "images/[name].[ext]",
                        limit: 100
                    }
                }
            ]
        },

        {
            test: /\.(eot|woff|woff2|ttf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name : "style/font/[name].[ext]",
                    }
                }
            ]
        },

];

exports.extractCss = extractCss;