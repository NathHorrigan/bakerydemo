import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from '@components/layout'
import styles from './locations.module.scss'

import { getMediaUrl } from '@util/urls'

const layout = data => {
  const locations = data.allPage.edges
  return (
    <Layout>
      <article className={styles.page}>
        <div className={styles.pageContent}>
          <header className={styles.pageHeader}>
            <h1>Locations</h1>
            <p>You can find our fine bakeries in friendly cities all over the world.</p>
          </header>

          <section className={styles.locations}>
            {locations.map(({ node }) => (
              <div key={node.id}>
                <Link to={`/locations/${node.slug}`}>
                  <div className={styles.locationImageContainer}>
                    <Img
                      className={styles.locationImage}
                      outerWrapperClassName={styles.locationImageOuter}
                      resolutions={node.image.localFile.childImageSharp.resolutions} alt="" />
                    <h3 className={styles.locationHeader}>{node.title}</h3>
                  </div>
                </Link>
                <address className={styles.locationAddress}>{node.address}</address>
                <a className={styles.locationButton} href={`https://google.com/maps/?q=${node.latLong}`} target="_blank" rel="noopener noreferrer">Map</a>
              </div>
            ))}
          </section>
        </div>
      </article>
    </Layout>
  )
}

export default () => <StaticQuery
  query={graphql`
      query LocationQuery {
          allPage(filter: { type: { eq: "LocationPage" } }) {
              edges {
                  node {
                      id
                      title
                      slug
                      address
                      latLong
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
          }
      }
  `}
  render={layout} />
