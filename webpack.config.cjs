
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public/robots.txt', 
          to: 'robots.txt' 
        },
        { 
          from: 'public/sitemap.xml', 
          to: 'sitemap.xml',
          // 确保 XML 文件被作为文本文件处理，保留原格式
          transform(content) {
            return content;
          }
        },
        { 
          from: 'public/favicon.ico', 
          to: 'favicon.ico' 
        },
        { 
          from: 'public/logo180.png', 
          to: 'logo180.png' 
        },
        { 
          from: 'public/logo192.png', 
          to: 'logo192.png' 
        },
        { 
          from: 'public/logo512.png', 
          to: 'logo512.png' 
        },
        { 
          from: 'public/default.jpg', 
          to: 'default.jpg' 
        },
        { 
          from: 'public/manifest.json', 
          to: 'manifest.json' 
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
  }
};
