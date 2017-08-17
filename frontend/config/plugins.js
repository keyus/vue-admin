/**
 * webpack 环境插件
 * @type {Array}
 */
const webpack           = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const fs                = require('fs');
const path              = require('path');
const Util              = require('./Utils');
const loaders           = require('./loader');

//vue-loader使用的子插件
const vuePlugin  = new webpack.LoaderOptionsPlugin({
    vue: {
        postcss: [ require('postcss-import')(), require('autoprefixer')() ]
    }
});

const CommonChunk = new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
            // node_modules中任何必须模块都提取到vender中
            return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(Util.resolve('../node_modules')) === 0
            )
        }
})

const UglifyJsPlugin     = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    comments: false,
    sourceMap: Util.isDev()
});

let plugins = [
    new webpack.HotModuleReplacementPlugin(),    // 启用热加载,也可以cli里面直接加上--hot参数
    loaders.extractCss,
    vuePlugin,
    CommonChunk,
];



/**
 * 以下是配置多页面输出的模板
 * html 多页模板
 * @type {[null]}
 */


let page= [
    { filename: 'index.html', template : './src/page/index.pug', chunks : 'app' },
];

if(!page.length){
    const outpage = item => {

        let filename = item.split('.');
        htmlpage.push({
            filename: `${filename[0]}.html`,
            template : path.resolve(__dirname, `../src/page/${filename}`),
            chunks : null
        })
    };

    let files = fs.readdirSync(path.resolve(__dirname, '../src/page'));

    files.forEach( item => {
        /\.pug/.test(item) && outpage(item)
    });

}

//遍历添加html输出插件
page.forEach((item)=>{
    plugins.push(
        new htmlWebpackPlugin({
            filename : item.filename,
            template : item.template,
            chunks : item.chunks,
            inject : true
        })
    )
});

/**
 * prod在线环境,压缩代码
 */

if(Util.isProd()){
    plugins.push( UglifyJsPlugin );
    plugins.push( new webpack.optimize.OccurrenceOrderPlugin() )
}


module.exports = plugins;