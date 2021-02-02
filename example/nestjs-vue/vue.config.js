const path = require('path');

/** @type import('@vue/cli-service').ProjectOptions */
const config = {
  chainWebpack(config) {
    config.entry('app').clear().add(path.resolve(__dirname, 'src/vue.main.ts'));
    config.module.rule('ts').use('my-loader').loader('nest-fullstack/loader').end()
    config.resolve.symlinks(false)
  },
};
module.exports = config;
