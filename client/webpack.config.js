const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss']
    // symlinks: false,
    // alias: {
    //     'mobx': path.resolve(__dirname, 'node_modules/mobx'),
    //     'react': path.resolve(__dirname, 'node_modules/react'),
    //     '@webtrends/navbar': path.resolve(__dirname, 'node_modules/@webtrends/navbar'),
    //     '@webtrends/react-components': path.resolve(__dirname, 'node_modules/@webtrends/react-components'),
    //     '@webtrends/utilities': path.resolve(__dirname, 'node_modules/@webtrends/utilities')
    // }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader"
      //     }
      //   ]
      // },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
};
