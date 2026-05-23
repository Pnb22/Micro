const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: 'auto'
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
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
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        cardapio: 'cardapio@http://localhost:3001/remoteEntry.js',
        pedido: 'pedido@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
