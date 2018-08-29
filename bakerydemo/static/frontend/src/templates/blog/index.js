import React from 'react'

import StreamField from '@components/streamfield'
import { getMediaUrl, parseDate } from '@util/urls'

import styles from './blog.module.scss'

export default (props) => {
    const blog = props.data.page;
    return (
        <div>
            <div className={styles.blogHero} style={{ backgroundImage: `url(${getMediaUrl(blog.image.file.original)})` }}>
                <div className={[styles.container, styles.blogMeta].join(' ')}>
                    <h1>{blog.title}</h1>
                    <p className={styles.blogSubtitle}>{blog.subtitle}</p>
                </div>
            </div>
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
