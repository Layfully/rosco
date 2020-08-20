// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Netlify CMS Gridsome starter template",
  siteDescription:
    "A simple, hackable & minimalistic starter for Gridsome that uses Netlify CMS for content.",

  templates: {
    Offer: "/:title",
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
};
