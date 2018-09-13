import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Layout from '@components/layout'
import styles from './breads.module.scss'
import Card from '@components/cards/bread'

const layout = data => {
    const breads = data.allPage.edges
    return (
        <Layout>
            <article className={styles.page}>
                <div className={styles.pageContent}>
                    <header className={styles.pageHeader}>
                        <h1>Breads</h1>
                        <p>We feature outlandishly delicious breads sourced from every continent (except Antarctica).</p>
                    </header>
                    <section className={styles.cardContainer}>
                        {breads.map(({ node }) => {
                            return (
                                <Link to={`/breads/${node.slug}`} key={node.id} className={styles.link}>
                                    <Card
                                        key={node.id}
                                        bread={node}
                                        styles={styles} />
                                </Link>
                            )
                        })}
                    </section>
                </div>
            </article>
        </Layout>
    )
}

export default () => <StaticQuery
    query={graphql`
        query BreadQuery {
            allPage(filter: { type: { eq: "BreadPage" } }) {
                edges {
                    node {
                        id
                        title
                        slug
                        origin {
                            title
                        }
                        breadType {
                            title
                        }
                        image {
                            localFile {
                              childImageSharp {
                                  resolutions(height: 180, width: 180) {
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