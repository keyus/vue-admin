/**
 * 项目入口
 * @type {{app: string}}
 */

const Util = require('./Utils');

const entry = {
    app : Util.resolve('../src/app.js'),
}

module.exports =  entry;
