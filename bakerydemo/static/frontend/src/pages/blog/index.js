import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '@components/layout'
import Blogs from '@components/blogs'
import { getMediaUrl, parseDate } from '@util/urls'
import styles from './blog.module.scss'

const layout = data => {
    const blogs = data.allPage.edges;
    return (
        <Layout>
            <div className={styles.blogContainer}>
                {blogs.map(({ node }) => {
                    return (
                        <Link to={`/blog/${node.slug}`} key={node.id} className={styles.blog}>
                            <Img className={styles.blogImage} resolutions={node.image.localFile.childImageSharp.resolutions} alt="" />
                            <div className={styles.blogText}>
                                <h2 className={styles.blogTitle}>{node.title}</h2>
                                <p className={styles.blogIntroduction}>{node.introduction}</p>
                            </div>
                            <div className={styles.blogMeta}>{parseDate(node.datePublished)}</div>
                        </Link>
                    )
                })}
            </div>
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
    render={layout} />
