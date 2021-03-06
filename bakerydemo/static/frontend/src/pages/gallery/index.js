import React from 'react'
import { graphql } from 'gatsby'
import Hero from '@components/hero'
import { getMediaUrl } from '@util/urls'

import styles from './galley.module.scss';

export default ({ data }) => {
    const gallery = data.allPage.edges;
    return (
        <div>
            {gallery.map(({ node }) => {
                return (
                    <div key={node.id}>
                        <Hero image={node.image.localFile.childImageSharp.resolutions} title={node.title} />
                        <div className={styles.container}>
                            <h2>{node.introduction}</h2>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export const query = graphql`
    query GalleryQuery {
        allPage(filter: { type: { eq: "GalleryPage" } }) {
            edges {
                node {
                    id
                    title
                    introduction
                    image {
                        localFile {
                            childImageSharp {
                                resolutions(width: 1600, height: 600) {
                                    ...GatsbyImageSharpResolutions_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
