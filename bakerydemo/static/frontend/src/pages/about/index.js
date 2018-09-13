import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './about.module.scss'

const layout = data => {
  const about = data.allPage.edges
  return (
    <Layout>
      <div>
        {about.map(({node}) => {
          return (
            <div key={node.id} className={styles.container}>
              <Img className={styles.aboutImage} resolutions={node.image.localFile.childImageSharp.resolutions} alt=""/>
              <h1>{node.title}</h1>
              <StreamField blocks={node.body}/>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default () => <StaticQuery
  query={graphql`
        query AboutPageQuery {
            allPage(filter: { type: { eq: "StandardPage" } }) {
                edges {
                    node {
                        id
                        title
                        body {
                            ...StreamFieldBlock
                            type
                        }
                        image {
                            localFile {
                                childImageSharp {
                                    resolutions {
                                        ...GatsbyImageSharpResolutions_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `}
  render={layout}/>
