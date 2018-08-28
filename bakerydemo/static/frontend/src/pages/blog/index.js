import React from 'react'
import Link from 'gatsby-link'

import { getMediaUrl, parseMonth } from '@util/urls'

import styles from './blog.module.scss'

export default ({data}) => {
    const blogs = data.allPage.edges;
    return (
        <div className={styles.container}>
            <div className={styles.blogContainer}>
                {blogs.map(({node}) => {
                    return (
                        <Link to={node.slug} key={node.id} className={styles.blog}>
                            <img className={styles.blogImage} src={getMediaUrl(node.image.file.thumbnail)}/>
                            <div className={styles.blogText}>
                                <h2 className={styles.blogTitle}>{node.title}</h2>
                                <p className={styles.blogIntroduction}>{node.introduction}</p>
                            </div>
                            <div className={styles.blogMeta}>{parseMonth(node.datePublished)}</div>
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
                    datePublished
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
