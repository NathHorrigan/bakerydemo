module.exports = {
  siteMetadata: {
    title: `Wagtail Bakery Demo`,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: 'gatsby-source-wagtail',
      options: {
        endpoint: (process.env.GATSBY_WAGTAIL_URL) ? process.env.GATSBY_WAGTAIL_URL : 'http://localhost:8000',
        queries: [
          {
            type: 'Page',
            extractKey: 'pages',
            path: './src/queries/pages.graphql',
            transform: node => tranformWagtailPage(node),
            imageUrlPrefix: process.env.IMAGE_PREFIX ? process.env.IMAGE_PREFIX : `http://localhost:8000`
          }
        ]
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          'Alegreya\:400,700',
          'Lato\:300,400,700,900'
        ]
      }
    },

  ]
}

const tranformWagtailPage = node => {
  let page = node.specific ? node.specific[0] : {}
  return ({
    ...page,
    type: page.__typename,
    body: (!page.body)
      ? null
      : page.body.map(({type, value}) => ({
        type,
        value: (typeof value == 'string')
          ? {content: value}
          : value
      }))
  })
}
