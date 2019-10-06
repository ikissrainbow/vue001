// webpack使用node语法
const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin') 
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = {
  devServer:{ // npm install webpack-dev-server -D,开发服务器配置 
    port: 3000, // 端口号
    progress: true, // 进度条
    contentBase: './dist', // 当前指定目录
    open: true, // 自动打开浏览器
    hot: true // 热部署

  },
  mode: 'development',
  entry: { // 入口
    main: path.join(__dirname, './src/main.js')
  },
  output: { // 出口
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist')
  },
  plugins:[ // 所有的webpack插件，数组，
    new HtmlWebpackPlugin({ // npm install html-webpack-plugin -D，抽离html模板
      template: './src/index.html', // 模板
      filename: 'index.html', // 打包后文件名称
      minify: { // 压缩
        removeAttributeQuotes: true,  // 删除双引号
        collapseWhitespace: true // 折叠空行
      },
      hash: true,// 生成哈希戳
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }), // npm install mini-css-extract-plugin -D，抽离CSS插件
    new VueLoaderPlugin()
  ],
  module: { // 模块
    rules:[ // 规则
      // { 
      //   test: /\.js$/,
      //   use:{
      //     loader: 'eslint-loader', // npm install eslint eslint-loader，语法校验，下载.eslintrc.json文件并拷贝至根目录
      //     options: {
      //       enforce: 'pre' // 优先执行
      //     }
      //   }
        
      // },
      { 
        test: /\.js$/,
        use:{
          loader: 'babel-loader', // npm install babel-loader @babel/core @babel/preset-env，处理es6语法
          options: {
            presets:[
              '@babel/preset-env', // es6 --> es5
              

            ],
            plugins :[  // 注意先后顺序
              ['@babel/plugin-proposal-decorators', { "legacy": true }], // npm install @babel/plugin-proposal-decorators -D，处理装饰器
              ['@babel/plugin-proposal-class-properties',{'loose': true}], // npm install @babel/plugin-proposal-class-properties -D，处理class语法
              '@babel/plugin-transform-runtime',// npm install @babel/plugin-transform-runtime -D,npm install @babel/runtime，处理运行时
              ["babel-plugin-component", // npm install babel-plugin-component -D，按需导入Mint UI
                {
                  "libraryName": "mint-ui",
                  "style": true
                }
              ]
            ]
          }
        },
        //include: path.resolve(__dirname, 'src'), // 搜索路径
        exclude:/node_modules/ // 排除路径
      },
      { 
        test: /\.css$/,
        use: [ // npm install css-loader style-loader -D，默认执行顺序：自下而上自右向左
              { 
                loader: 'style-loader', // css-loader解析@import语法，style-loader将css插入head标签中
                options: {
                  //insert: 'top'
                }
              }, 
              { 
                loader: 'css-loader',
                options: {}
              } 
        ]
      } ,
      { 
        test: /\.less$/,
        use: [ // npm install less less-loader -D
              // { 
              //   loader: 'style-loader', 
              //   options: {}
              // }, 
              MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader' // less-->css
        ]
      }, 
      { 
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'less-loader'] // npm install scss scss-loader -D
  
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        // use: 'file-loader' // npm install file-loader -D，配置图片文件
        use: {
          loader: 'url-loader', // npm install url-loader -D，配置图片文件，内部依赖file-loader，可以添加限制
          options: {
            limit: 100*1024, // 当图片小于200k，使用base64转化，否则展示真实图片，注意单位为byte
            name: '[hash:8]-[name].[ext]' // 新文件名保留原文件名、扩展名，加入8位哈希值，注意hash:位数中间不能加空格
          }
        }
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'}, // npm i bootstrap -S，处理bootstrap字体样式，
      { test: /\.vue$/, use:'vue-loader'} // npm i vue -S，npm i vue-loader vue-template-compiler -D，配置vue文件
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js' // 配置完整版vue
    }
  }
}

module.exports = config
