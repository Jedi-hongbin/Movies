const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html',
})

module.exports = {
  mode: 'development',
  plugins: [htmlPlugin],
  module: {
    //所有第三方模块的使用
    rules: [
      //规则
      {
        test: /\.js|jsx$/, //匹配js或jsx
        use: 'babel-loader', //使用babel-loader
        exclude: /node_modules/, //排除node_modules中的js或jsx语法
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.png|jpg|gif$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,//限制最大8k大小图片
            },
          },
        ]
      },
    ],
  },
  resolve: {
    //省去js文件中导入文件的后缀名
    extensions: ['.js', '.jsx', '.json'], //表示引入的文件自动匹配后缀名从数组中的第一项开始匹配
    alias: {
      //别名
      '@': path.join(__dirname, './src'), //表示@代表根目录下的src目录
    },
  },
}
