const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators

  const templates = [
    {type: 'BreadPage', component: path.resolve(`src/templates/bread/index.js`)},
    {type: 'LocationPage', component: path.resolve(`src/templates/location/index.js`)},
    {type: 'BlogPage', component: path.resolve(`src/templates/blog/index.js`)}
  ]

  return graphql(`{
    allPage {
      edges {
        node {
          type
          id
          urlPath
        }
      }
    }
  }`)
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors)
      }

      result.data.allPage.edges
        .map(({node}) => {
          if (node.urlPath) {
            const {urlPath, id, type} = node
            const path = urlPath.startsWith('/home/') ? urlPath.slice(5, urlPath.length) : urlPath
            const template = templates.find(template => template.type === type)
            if (template) {
              createPage({
                path,
                component: template.component,
                context: {
                  id
                }
              })
            }
          }
        })
    })
}