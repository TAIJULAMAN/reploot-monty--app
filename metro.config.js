const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

if (config.resolver && config.resolver.assetExts) {
  if (!config.resolver.assetExts.includes("xml")) {
    config.resolver.assetExts.push("xml");
  }
}

// Limit workers on Windows to prevent EMFILE (too many open files)
if (process.platform === "win32") {
  config.maxWorkers = 2;
}

module.exports = withNativeWind(config, { input: "./global.css" });
