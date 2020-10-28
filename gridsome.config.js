// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  siteName: "Rosco",
  siteUrl: "https://roscoserwis.pl",

  templates: {
    Offer: "/:title",
  },
  icon: {
    favicon: "./src/favicon.png",
    touchicon: "./src/touchicon.png",
  },
  plugins: [
    {
      // Create offers from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Offer",
        path: "content/offers/*.md",
        coverField: "card_image",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "PageData",
        path: "content/pages/**/*.md",
        coverField: "main_image",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "ConfigData",
        path: "content/config/**/*.md",
      },
    },
    {
      use: "gridsome-plugin-netlify-cms",
      options: {
        publicPath: "/admin",
        modulePath: `src/admin/index.js`,
        htmlPath: "src/admin/index.html",
        configPath: "src/admin/config.yml",
      },
    },
    {
      use: "gridsome-plugin-netlify-cms-paths",
      options: {
        contentTypes: ["Offer", "PageData"],
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"],
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData:
          '@import "@/assets/style/_variables", "@/assets/style/_mixins";',
      },
    },
  },
};
