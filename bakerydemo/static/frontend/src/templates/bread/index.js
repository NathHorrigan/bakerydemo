import React from 'react'

import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './bread.module.scss'

export default (props) => {
  console.log(props)
  const bread = props.data.page
  return (
    <div className={styles.container}>
        <article className={styles.page}>
            <div className={styles.pageContent}>
                <header className={styles.pageHeader}>
                <h1>{bread.title}</h1>
                </header>

                <section className={styles.breadInfo}>
                <p className={styles.breadIntro}>{bread.introduction}</p>
                <div className={styles.breadContent}>
                    <StreamField blocks={bread.body} />
                </div>

                <img className={styles.breadImg} src={getMediaUrl(bread.image.file.original)}/>
                <section className={styles.breadMeta}>
                <span className={styles.breadMetaRow}>
                    <span className={styles.cardMetaLabel}>Origin:</span>
                    <span>{bread.origin.title}</span>
                </span>
                    <span className={styles.breadMetaRow}>
                    <span className={styles.cardMetaLabel}>Type:</span>
                    <span>{bread.breadType.title}</span>
                </span>
                </section>

                </section>
            </div>
        </article>
    </div>
  )
}

export const query = graphql`
    query BreadById($id: String!) {
        page(id: { eq: $id }) {
            id
            title
            slug
            urlPath
            introduction
            body {
                ...StreamFieldBlock
            }
            origin {
                title
            }
            breadType {
                title
            }
            image {
                file {
                    original
                    thumbnail
                }
            }
        }
    }
`
