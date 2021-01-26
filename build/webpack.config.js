const {resolve} = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const {DefinePlugin} = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: ['pug-loader'],
          },
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, '../src'),
      '~': resolve(__dirname, '../node_modules'),
    },
  },
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new htmlWebpackPlugin({
      template: resolve(__dirname, '../src/template/index.pug'),
    }),
  ],
};
