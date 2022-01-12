const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { terserPluginConfig } = require("./env.config");
const baseWebpackConfig = require("./webpack.config.base");

module.exports = (env, options) => 
{
    const baseConfig = baseWebpackConfig(env, options);
    baseConfig.plugins.push(new CleanWebpackPlugin())
    return {
        ...baseConfig,
        optimization: {
            minimizer: [
                new TerserPlugin(terserPluginConfig)
            ],
            splitChunks: {
                chunks: "all",
            },
        }
    };
};
