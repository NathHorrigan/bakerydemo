import React from 'react'
import { graphql } from 'gatsby'
import dayjs from 'dayjs'
import Layout from '@components/layout'
import Hero from '@components/hero'
import StreamField from '@components/streamfield'
import Map from '@components/map'
import styles from './location.module.scss'
import { getMediaUrl } from '@util/urls'

export default ({data}) => {
  const location = data.page
  return (
    <Layout expand>
      <Hero
        image={location.image.localFile.childImageSharp.resolutions}
        subtitle={`This location is currently ${renderOpenOrClosed(location.hoursOfOperation)}`}
        title={location.title}
      />
      <div className={styles.pageContent}>
        <div className={styles.container}>
          <div className={styles.infoContainer}>

            <section className={styles.infoContent}>
              <StreamField blocks={location.body}/>
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
        <Map latLong={location.latLong}/>
      </div>

    </Layout>
  )
};

const renderWeek = hoursOfOperation => hoursOfOperation.map(day => {
  const opening = (day.openingTime) ? dayjs(`1/1/2018 ${day.openingTime}`).format('hh:mmA') : 'CLOSED'
  const closing = (day.closingTime) ? dayjs(`1/1/2018 ${day.closingTime}`).format('hh:mmA') : 'CLOSED'
  return (
    <span key={day.day}>
      <time className={styles.time}><span>{day.day}:</span> {opening} - {closing}</time>
      <br />
    </span>
  )
})

const renderOpenOrClosed = (hours) => {
  const today = dayjs().subtract(1, 'day').day();
  const timeNow = dayjs().format('HH:mm:ss')
  const locationHours = hours[`${today}`];
  return timeNow > locationHours.openingTime && timeNow < locationHours.closingTime ? 'open' : 'closed';
}

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
                localFile {
                    childImageSharp {
                        resolutions(width: 1600, height: 600) {
                            ...GatsbyImageSharpResolutions_withWebp
                        }
                    }
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
