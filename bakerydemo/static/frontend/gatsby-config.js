module.exports = {
  siteMetadata: {
    title: `Wagtail Bakery Demo`,
  },
  plugins: [
    `gatsby-plugin-react-next`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,

    {
      resolve: 'gatsby-plugin-graphql',
      options: {
        endpoint: (process.env.GATSBY_WAGTAIL_URL) ? `${process.env.GATSBY_WAGTAIL_URL}/graphql` : 'http://localhost:8000/graphql',
        queries: [
          {
            type: 'page',
            extractKey: 'pages',
            path: './src/queries/pages.graphql',
            transform: node => tranformWagtailPage(node)
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
  let page = (node.specific) ? node.specific[0] : {}
  // console.log()
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
