import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// 정적 파일 복사 플러그인
import CopyWebpackPlugin from "copy-webpack-plugin";

export default (env, argv) => {
  const isProdMode = argv.mode === "production";
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve("dist/"),
      filename: "app.js",
      // 반드시 모드로 나눠 작성한다. 배포모드일시 레포지터리 이름이나 url을 적어주자
      publicPath: isProdMode ? "/test/" : "/",
    },
    devServer: {
      port: 3010,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
          ],
        },
        // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
        // ts-loader의 옵션은 성능 향상을 위해서
        {
          test: /\.(ts|tsx)$/,
          use: [
            "babel-loader",
            "ts-loader",
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            "babel-loader",
          ],
          exclude: /node_modules/,
        },
        // 파일 로더
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
      new ForkTsCheckerWebpackPlugin(),
      // 파일, 폴더 복사 플러그인
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
          },
        ],
      }),
    ],
  };
};
