import React from 'react'
import Link from 'gatsby-link'

import { getMediaUrl } from '@util/urls'

import styles from './blog.module.scss'

export default ({data}) => {
    const blogs = data.allPage.edges;
    return (
        <div className={styles.container}>
            <div className={styles.blogContainer}>
                {blogs.map(({node}) => {
                    return (
                        <Link to={node.slug} key={node.id} className={styles.blog}>
                            <div>
                                <img className={styles.blogImage} src={getMediaUrl(node.image.file.thumbnail)}/>
                            </div>
                            <h2>{node.title}</h2>
                            <h2>{node.introduction}</h2>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export const query = graphql`
    query BlogQuery {
        allPage(filter: { type: { eq: "BlogPage" } }) {
            edges {
                node {
                    id
                    title
                    slug
                    urlPath
                    introduction
                    image {
                        file {
                            original
                            thumbnail
                        }
                    }
                }
            }
        }
    }
`
