module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "transform-decorators-legacy",
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
}
