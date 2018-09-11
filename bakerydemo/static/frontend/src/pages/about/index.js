import React from 'react'

import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './about.module.scss'

export default ({ data }) => {
    const about = data.allPage.edges;
    return (
        <Layout>
            <div>
                {about.map(({ node }) => {
                    return (
                        <div key={node.id} className={styles.container}>
                            <div className={styles.readingColumn}>
                                <img className={styles.aboutImage} src={getMediaUrl(node.image.file.thumbnail)} alt="" />
                                <h1>{node.title}</h1>
                                <StreamField blocks={node.body} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export const query = graphql`
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
`
