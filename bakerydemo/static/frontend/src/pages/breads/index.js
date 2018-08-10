import React from 'react'
import styles from './breads.module.scss'
import Card from '@components/cards/bread'
import Link from 'gatsby-link'

export default ({data}) => {
  const breads = data.allPage.edges
  return (
    <div className={styles.container}>
        <article className={styles.page}>
        <div className={styles.pageContent}>
            <header className={styles.pageHeader}>
            <h1>Breads</h1>
            <p>We feature outlandishly delicious breads sourced from every continent (except Antarctica).</p>
            </header>
            <section className={styles.cardContainer}>
            {breads.map(({node}) => {
                return (
                <Link to={node.slug} key={node.id} className={styles.link}>
                    <Card
                    key={node.id}
                    bread={node}
                    styles={styles}/>
                </Link>
                )
            })}
            </section>
        </div>
        </article>
    </div>
  )
}

export const query = graphql`
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
