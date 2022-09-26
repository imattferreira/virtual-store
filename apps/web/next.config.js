const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
});
