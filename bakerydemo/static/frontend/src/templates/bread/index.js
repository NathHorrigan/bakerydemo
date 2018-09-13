import React from 'react'
import { graphql } from "gatsby"
import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import { getMediaUrl } from '@util/urls'

import styles from './bread.module.scss'
import Img from 'gatsby-image'

export default (props) => {
    const bread = props.data.page
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

                        <Img className={styles.breadImg} resolutions={bread.image.localFile.childImageSharp.resolutions} alt=""/>

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

export const query = graphql`
    query($id: String!) {
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
                localFile {
                  childImageSharp {
                      resolutions(height: 350) {
                          ...GatsbyImageSharpResolutions_withWebp
                      }
                  }
                }
            }
        }
    }
`
