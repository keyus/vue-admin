/**
 * 检测环境及常用方法，只用在webpack中
 */

/**
 * 读取运行环境
 * @dev   开发环境
 * @prod  生产环境
 * @type {*|string}
 */
const path  = require('path');
let runtime = process.env.NODE_ENV || 'dev';

module.exports = {

    resolve(dir) {
        return path.resolve(__dirname,dir);
    },

    isDev () {
        return runtime === 'dev';
    },

    isProd () {
        return runtime === 'prod';
    }

}