import path from "path";
import webpack from "webpack";
import { Configuration as WebpackConfig } from "webpack";
import { Configuration as WebpackDevConfig } from "webpack-dev-server";

interface Config extends WebpackConfig {
  devServer?: WebpackDevConfig;
}

const config: Config = {
  entry: "/src",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "src/style"),
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["url-loader?limit=10000", "img-loader"],
        include: path.resolve(__dirname, "src/images"),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    host: "0.0.0.0",
    open: false,
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    publicPath: "http://localhost:3000/dist",
    hot: true,
    // hotOnly: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

export default config;
