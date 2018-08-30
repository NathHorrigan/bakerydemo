import React from 'react'

import styles from './quote.module.scss'

export default ({ quote, cite }) => {
    return (
        <blockquote className={styles.quote}>
            <p className={styles.quoteText}>{quote}</p>
            <cite className={styles.quoteCite}>{cite}</cite>
        </blockquote>
    )
}
