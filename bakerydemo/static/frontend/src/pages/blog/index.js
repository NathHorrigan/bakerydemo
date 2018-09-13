import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '@components/layout'
import Blogs from '@components/blogs'
import styles from './blog.module.scss'

const layout = data => {
    const blogs = data.allPage.edges;
    return (
        <Layout>
            <header className={styles.pageHeader}>
                <h1>Blog</h1>
                <p>Welcome to our blog</p>
            </header>
            <Blogs blogs={blogs} />
        </Layout>
    )
}

export default () => <StaticQuery
    query={graphql`
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
                        tags
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
    `}
    render={layout} />
