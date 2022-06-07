const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { argv } = require('process')
const tailwindcss = require('tailwindcss')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env')
}).parsed

const mode = dotenv.APP_ENV || 'production'
const port = dotenv.PORT || 3000

module.exports =  {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],    
  },
  mode,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   // options: {
          //   //   hmr: mode === 'development'
          //   // }
          // },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
      // {
      //   test: /\.(s?[ac])ss$/i,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     "sass-loader"
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].css"
    })
  ],
}

if (mode === "development"){
  module.exports.devServer = {
    historyApiFallback: true,
    static:{
      directory: path.join(__dirname, 'dist'),
    },
    port,
    proxy: { '/': 'http://localhost:4000'}
  }
}