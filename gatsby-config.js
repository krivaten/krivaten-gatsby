module.exports = {
  siteMetadata: {
    title: `Kris Van Houten`,
    description: `christian, husband, father, introvert, bookworm, developer, designer, peacemaker`,
    siteUrl: `https://krivaten.com/`,
    social: {
      twitter: `krivaten`
    }
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-svg-sprite`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kris Van Houten`,
        short_name: `krivaten`,
        start_url: `/`,
        background_color: `#f9f9f9`,
        theme_color: `#00807e`,
        display: `minimal-ui`,
        icon: `src/img/favicon-logo.png`
      }
    },
    `gatsby-plugin-react-helmet`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
