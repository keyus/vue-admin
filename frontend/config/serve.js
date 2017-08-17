/**
 * 热加载，服务器配置
 * @type {{contentBase: string, compress: boolean, port: number, hot: boolean}}
 */
const Util = require('./Utils');
const path = require('path');

module.exports = {
    contentBase: path.join(__dirname,  (
        Util.isDev() ? 'dist' : 'prod'
    )),
    compress: true,
    port: 9000,
    hot: true
};