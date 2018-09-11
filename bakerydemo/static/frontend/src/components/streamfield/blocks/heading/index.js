import React from 'react'

import styles from './heading.module.scss'

export default ({ size, content }) => {
  switch (size) {
    case 'h1':
      return <h1 className={[ styles.heading, styles.h1 ]}>{content}</h1>

    case 'h2':
      return <h2 className={[ styles.heading, styles.h2 ]}>{content}</h2>

    case 'h3':
      return <h3 className={styles.heading}>{content}</h3>

    case 'h4':
      return <h4 className={[ styles.heading, styles.h4 ]}>{content}</h4>

    default:
      return <h3 className={styles.heading}>{content}</h3>
  }
}