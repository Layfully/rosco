// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Rosco",

  siteDescription:
    "A simple, hackable & minimalistic starter for Gridsome that uses Netlify CMS for content.",

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
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "PageData",
        path: "content/pages/**/*.md",
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
