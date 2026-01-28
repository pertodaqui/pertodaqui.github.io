/** @type {import('next').NextConfig} */
const JavaScriptObfuscator = require("webpack-obfuscator");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(
        new JavaScriptObfuscator(
          {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            disableConsoleOutput: true,
            identifierNamesGenerator: "hexadecimal",
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: ["base64"],
            stringArrayThreshold: 0.75,
            splitStrings: true,
            splitStringsChunkLength: 8
          },
          []
        )
      );
    }
    return config;
  }
};

module.exports = nextConfig;
