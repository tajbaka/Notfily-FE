const path = require("path");

const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

module.exports = {
  jest: config => {
    config.modulePaths = ["src/"];
    return config;
  },
  webpack: (config, env) => {
    config.resolve.alias.src = path.resolve(__dirname, "./src/");
    return config;
  }
};

module.exports = function override(config, env) {
  config = rewireSvgReactLoader(config, env);
  return config;
}
