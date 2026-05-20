const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  devServer: {
    port: 3002,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Pedido',
      filename: 'remoteEntry.js',
      exposes: {
        './PedidoApp': './src/PedidoApp.jsx'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' }
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') })
  ]
};
