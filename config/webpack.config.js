var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var srcDir = path.resolve(__dirname, '../src')
var staticDir = path.resolve(__dirname, '../static')

var dirs = fs.readdirSync(srcDir).filter(function(dir) {
	return fs.statSync(path.resolve(srcDir, dir)).isDirectory()
})

var indexPath = path.resolve(staticDir, 'mock.js')
var indexContent = fs.readFileSync(indexPath,{
  encoding: 'utf-8'
})
var indexReg = /(\/\*dir\{%\*\/\n)(?:.|\n)*(\n\/\*\%}\*\/)/
indexContent = indexContent.replace(indexReg, function(all, pre, suf) {
  return pre + 'const dirs = ' + JSON.stringify(dirs) + suf
})

fs.writeFileSync(indexPath, indexContent)

module.exports = {
  entry: {
    main: [
      './static/src/index.js',
    ],
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name]-[id].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  externals: {
    widgetInstance: 'widgetInstance',
    widgetTool: 'widgetTool',
    widgetContext: 'widgetContext',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          srcDir,
          staticDir,
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        include: [
          srcDir,
          staticDir,
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name]-[hash:8].[ext]'
        }
      }
    ]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'static/index.html',
    }),
  ],
}
