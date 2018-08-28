import React from 'react'
import styles from './hero.module.scss'

export default ({ title, image, tag }) => (
  <div className={styles.hero} style={{backgroundImage: `url(${image})`}}>
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>{title}</h1>
    </div>
  </div>
)
