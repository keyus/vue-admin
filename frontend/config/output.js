/**
 * David.hu
 * 项目入口
 * 是nodejs通用的环境变量 可以在命令行中指定
 * process.env.NODE_ENV
 * @type {{app: string}}
 */

const path  = require('path');
const Util  = require('./Utils');

let outPath;


if(Util.isDev()){
    outPath = path.resolve(__dirname,'../dist');
}else{
    outPath = path.resolve(__dirname,'../prod');
}

module.exports = {
    path        : outPath,
    publicPath  : '/',
    filename    : "js/[name].js"
}
