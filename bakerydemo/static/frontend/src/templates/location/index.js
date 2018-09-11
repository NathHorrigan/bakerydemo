import React from 'react'
import { graphql } from "gatsby"
import dayjs from 'dayjs'
import Layout from '@components/layout'
import Hero from '@components/hero'
import StreamField from '@components/streamfield'
import Map from '@components/map'
import styles from './location.module.scss'
import { getMediaUrl } from '@util/urls'

export default ({ data }) => {
  const location = data.page
  return (
    <Layout>

      <Hero image={getMediaUrl(location.image.file.original)} title={location.title} />

      <div className={styles.pageContent}>
        <div className={styles.container}>
          <div className={styles.infoContainer}>

            <section className={styles.infoContent}>
              <StreamField blocks={location.body} />
            </section>

            <section className={styles.infoOpeningHours}>
              <h3 className={styles.infoOpeningHoursHeader}>Opening Hours:</h3>
              {renderWeek(location.hoursOfOperation)}
            </section>

          </div>
        </div>
      </div>

      <div className={styles.locationContainer}>
        <section className={styles.locationAddress}>
          <h3>{location.address}</h3>
        </section>
          <Map latLong={location.latLong} />
      </div>

    </Layout>
  )
};

const renderWeek = hoursOfOperation => hoursOfOperation.map(day => {
  const opening = (day.openingTime) ? dayjs(`1/1/2018 ${day.openingTime}`).format('hh:mmA') : 'CLOSED'
  const closing = (day.closingTime) ? dayjs(`1/1/2018 ${day.closingTime}`).format('hh:mmA') : 'CLOSED'
  return (
    <span>
      <time className={styles.time}><span>{day.day}:</span> {opening} - {closing}</time>
      <br />
    </span>
  )
})


export const query = graphql`
    query($id: String!) {
        page(id: { eq: $id } ) {
            title
            introduction
            body {
                type
                value {
                    content
                    heading_text
                    size
                }
            }
            image {
                file {
                    original
                    thumbnail
                }
            }
            hoursOfOperation {
                day
                openingTime
                closingTime
            }
            address
            latLong
        }
    }
`
