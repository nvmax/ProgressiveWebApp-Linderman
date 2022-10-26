const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
          },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        // thanks scott casey for help on this portion
        template: './index.html',
        title: 'JATE',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        // thanks scott casey for help on this portion
        inject: true,
        fingerprints: false,
        name: 'JATE',
        short_name: 'JATE',
        description: 'JATE is a PWA allows you to save content for offline use.',
        background_color: '#01579b',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // copied from previous stu activities 
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
            