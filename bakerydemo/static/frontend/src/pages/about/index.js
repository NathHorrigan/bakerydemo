import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './about.module.scss'

const layout = data => {
    const about = data.allPage.edges;
    return (
        <Layout>
            <div>
                {about.map(({ node }) => {
                    return (
                        <div key={node.id} className={styles.container}>

                            <img className={styles.aboutImage} src={getMediaUrl(node.image.file.thumbnail)} alt="" />
                            <h1>{node.title}</h1>
                            <StreamField blocks={node.body} />

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
                            file {
                                thumbnail
                            }
                        }
                    }
                }
            }
        }
    `}
    render={layout} />
