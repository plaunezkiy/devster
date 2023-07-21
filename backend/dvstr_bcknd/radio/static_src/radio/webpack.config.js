const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../../static/js"),
    filename: "radio.js",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // use: ["babel-loader"],
        // options: {
        //   presets: [
        //     "@babel/preset-env",
        //     ["@babel/preset-react", { runtime: "automatic" }],
        //   ],
        // },
      },
    ],
  },
};
