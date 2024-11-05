const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isRunBundle = process.env.RUN_BUNDLE === 'true';

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    path: path.resolve('dist/'),
    filename: '[name].[contenthash].js',
    // prefix 개념 번들 파일 앞에 요청할 주소 ec2 url 이나 s3
    publicPath: './',
    clean: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [(isRunBundle && new BundleAnalyzerPlugin())],
});
