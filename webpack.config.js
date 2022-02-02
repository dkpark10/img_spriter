const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'app.js'
  },
  devServer: {
    port: 3010
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
      // ts-loader의 옵션은 성능 향상을 위해서
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
    new ForkTsCheckerWebpackPlugin(),
  ],
};
