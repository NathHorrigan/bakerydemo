import React from 'react'

import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './about.module.scss'

export default ({ data }) => {
    const about = data.allPage.edges;
    return (
        <div>
            {about.map(({ node }) => {
                return (
                    <div key={node.id} className={styles.container}>
                        <div className={styles.readingColumn}>
                            <img className={styles.aboutImage} src={getMediaUrl(node.image.file.thumbnail)} alt="" />
                            <h1>{node.title}</h1>
                            <StreamField key={node.id} blocks={node.body} />
                        </div>
                    </div>
                )
            })}
        </div>
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
