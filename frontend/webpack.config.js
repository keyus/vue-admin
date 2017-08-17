const Util    = require('./config/Utils');
const entry   = require('./config/entry');
const output  = require('./config/output');
const loaders = require('./config/loader');
const plugins = require('./config/plugins');
const serve   = require('./config/serve');

let config = {
    entry  : entry,
    output : output,
    module : {
        loaders: loaders.loader
    },
    devtool: 'inline-source-map',
    devServer: serve,
    plugins: plugins
}

/**
 * 开发环境，加上 source-map
 */
Util.isDev() &&  (config.devtool = 'inline-source-map');

module.exports = config;