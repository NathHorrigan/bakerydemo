import React from 'react'
import styles from './hero.module.scss'

export default ({ title, image, subtitle, tag }) => (
  <div className={styles.hero} style={{ backgroundImage: `url(${image})` }}>
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>{title}</h1>

      {subtitle ? (
        <p className={styles.heroSubtitle}>{subtitle}</p>
      ) : (
          null
        )}

    </div>
  </div>
)
