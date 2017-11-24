const webpack = require('webpack');
//auto insert module
const HtmlPlugin = require('html-webpack-plugin');
//ouput css to files
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const glob = require("glob");
module.exports = {
  entry: {

    /* app: ["src/js/app.tsx", "src/js/components/Excel.tsx", "src/js/components/FormInput.tsx",
    "src/js/components/Rating.tsx", "src/js/components/Suggest.tsx", "src/js/classification.tsx", "src/js/schema.tsx"], */
    app : glob.sync("./src/js/*.tsx", "./src/js/components/*.tsx"),
    vendors: [
      'react',
      'react-dom',
      'redux',
      'react-redux'
    ],
  },  
  output: {
    path: __dirname + '/dist',
    filename: "[name].js",
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }  
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader : 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                minimize: true,
                localIdentName: "[local]_[hash:base64:5]"
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              //configFileName: './src/tsconfig.json'
            }
          },
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false,
              doctype: 'html'
            }
          }
        ]
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // 
  plugins: [
    new HtmlPlugin({
      // 指定index.html的模板文件路径
      template: 'src/index.pug',
      filename: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin(
      {name : 'vendors', filename : 'vendors.js'}),
    new ExtractTextPlugin("styles.css"),
  ],
  devServer: {
    historyApiFallback: true, // 404将会重定向至index.html
    port: 8888 // 端口号
  }
};
