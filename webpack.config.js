const webpack = require('webpack');
module.exports = {
    devtool: 'eval-source-map', // 在不影响构建速度的前提下生成完整的sourcemap，但对打包后输出的JS文件的执行具有性能和安全的隐患。生产阶段弃用；    
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    devServer: {
        port: 5000,
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    // loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..
    module: {
        rules: [
            //npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ],
                        env: {
                            development: {
                            plugins: [["react-transform", {
                               transforms: [{
                                 transform: "react-transform-hmr",
                                 imports: ["react"],
                                 locals: ["module"]
                               }]
                             }]]
                            }
                          }
                    }
                },
                exclude: /node_modules/
            },
            //npm install --save-dev style-loader css-loader
            // css 打包
            /*
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            },
            */
            // 使用CSS module 
            // 所有的类名，动画名默认都只作用于当前模块
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            }

        ]
    },
    // 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。插件并不直接操作单个文件，它直接对整个构建过程其作用。
    // 打包后代码添加版权声明的插件。
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
}