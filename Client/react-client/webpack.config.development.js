const { devServer } = require("./env.config");
const baseWebpackConfig = require("./webpack.config.base");

module.exports = (env, options) => 
{
    const baseConfig = baseWebpackConfig(env, options);
    baseConfig.module.rules[1].use.unshift("style-loader");

    return {
        ...baseConfig,

        // Dev only
        devServer,

        // Target must be set to web for hmr to work with .browserlist
        // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
        target: "web",
    };
};
