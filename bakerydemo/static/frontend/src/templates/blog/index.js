import React from 'react'

import StreamField from '@components/streamfield'
import Hero from '@components/hero'
import { getMediaUrl, parseDate } from '@util/urls'

import styles from './blog.module.scss'

export default (props) => {
    const blog = props.data.page;
    return (
        <div>
            <Hero image={getMediaUrl(blog.image.file.original)} title={blog.title} subtitle={blog.subtitle} tag={''} />
            <div className={styles.container}>
                <div className={styles.readingColumn}>
                    <p className={styles.blogIntroduction}>{blog.introduction}</p>
                    <p>{parseDate(blog.datePublished)}</p>
                    <StreamField blocks={blog.body} />
                </div>
            </div>
        </div>
    )
}

export const query = graphql`
    query BlogById($id: String!) {
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
                }
            }
            subtitle
            datePublished
            tags
            image {
                file {
                    thumbnail
                    original
                }
            }
        }
    }
`
