import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styles from './hero.module.scss'

export default ({ title, image, subtitle, modifier, ctaText, ctaLink, tag }) => (
  <div className={[styles.hero, modifier].join(' ')}>
    <Img resolutions={image}
         style={{
           position: "absolute",
           left: 0,
           top: 0,
           width: '100%',
           height: '100%'
      }} />
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>{title}</h1>

      {subtitle ? (
        <p className={styles.heroSubtitle}>{subtitle}</p>
      ) : (
          null
        )}

      {ctaLink ? (
        <Link to={ctaLink} className={styles.heroCta}>{ctaText}</Link>
      ) : (
          null
        )}

    </div>
  </div>
)
