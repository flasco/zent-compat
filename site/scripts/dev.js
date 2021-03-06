const { resolve } = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const cp = require('child_process');

const webpackConfig = require('../webpack/webpack.dev.config.js');

const cmds = {
  wind32: 'start',
  linux: 'xdg-open',
  darwin: 'open',
};

let onceMark = true;

const compiler = webpack(webpackConfig);

// compiler.apply(
//   new ProgressPlugin((percentage, message, ...args) => {
//     // {
//     //   format: '  build [:bar] :percent (:elapsed seconds)',
//     //   clear: false,
//     //   width: 60,
//     // }
//     // e.g. Output each progress message directly to the console:
//     console.info(percentage, message, ...args);
//   })
// );

compiler.plugin('done', () => {
  if (onceMark) {
    cp.exec(`${cmds[process.platform]} http://127.0.0.1:4397`);
  }
  onceMark = false;
});

const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true,
  },
  hot: true,
  contentBase: resolve(__dirname, 'dist'),
  publicPath: '/',
  disableHostCheck: true,
  inline: true,
  historyApiFallback: true,
});

server.listen(4397, '0.0.0.0', () => {
  // eslint-disable-next-line
  console.log('\n Starting server on http://localhost:4397 \n');
});
