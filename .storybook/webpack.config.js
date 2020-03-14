const path = require('path');
// your app's webpack.config.js
const custom = require('../webpack.config.js');

module.exports = async ({ config, mode }) => {
  const finalConfig = {
    ...config,
    module: { ...config.module, rules: custom.module.rules },
    resolve: { ...config.resolve, modules: ['node_modules', 'src'] },
  };
  return finalConfig;
};
