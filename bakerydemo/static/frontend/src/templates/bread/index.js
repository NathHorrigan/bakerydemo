import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './bread.module.scss'

const layout = data => {
    const bread = data.page
    return (
        <Layout>
            <article className={styles.page}>
                <div className={styles.pageContent}>

                    <section className={styles.breadInfo}>
                        <div>
                            <h1>{bread.title}</h1>
                            <p className={styles.breadIntro}>{bread.introduction}</p>
                            <div className={styles.breadContent}>
                                <StreamField blocks={bread.body} />
                            </div>
                        </div>

                        <img className={styles.breadImg} src={getMediaUrl(bread.image.file.original)} />

                        <section className={styles.breadMeta}>
                            <span className={styles.breadMetaRow}>
                                <h4 className={styles.cardMetaLabel}>Origin</h4>
                                <span>{bread.origin.title}</span>
                            </span>
                            <span className={styles.breadMetaRow}>
                                <h4 className={styles.cardMetaLabel}>Type</h4>
                                <span>{bread.breadType.title}</span>
                            </span>
                        </section>

                    </section>
                </div>
            </article>
        </Layout>
    )
}

export default props => {
    alert(props)
    return <StaticQuery
    query={graphql`
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
    `}
    render={layout} />
}
