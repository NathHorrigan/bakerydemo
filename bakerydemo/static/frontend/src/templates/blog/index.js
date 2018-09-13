import React from 'react'
import { graphql } from "gatsby"
import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import Hero from '@components/hero'
import { getMediaUrl, parseDate } from '@util/urls'

import styles from './blog.module.scss'

export default (props) => {
    const blog = props.data.page;
    return (
        <Layout expand>
            <Hero image={blog.image.localFile.childImageSharp.resolutions} title={blog.title} subtitle={blog.subtitle} />
            <div className={styles.container}>
                <div className={styles.readingColumn}>
                    <p className={styles.blogIntroduction}>{blog.introduction}</p>
                    <p>{parseDate(blog.datePublished)}</p>
                    <div className={styles.blogAuthor}>
                        <img src="https://placehold.it/50" />
                        <p>Lightning Hopkins</p>
                    </div>
                    <StreamField blocks={blog.body} />
                </div>
                <p className={styles.blogTagTitle}>Tagged with:</p>
                {blog.tags.map((tag) => <div className={styles.blogTag} key={tag}>{tag}</div>)}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        page(id: { eq: $id }) {
            id
            title
            introduction
            body {
                ...StreamFieldBlock
                type
                value {
                    caption
                    image
                    text
                    attribute_name
                }
            }
            subtitle
            datePublished
            tags
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
`
