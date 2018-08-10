import React from 'react';
import { getMediaUrl } from '@util/urls'

import styles from './card.module.scss'

export default ({ bread: {title, origin, breadType, image}}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardImageContainer}>
                <img className={styles.cardImage} src={getMediaUrl(image.file.thumbnail)} alt=""/>
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <div className={styles.cardMeta}>
                    <span className={styles.cardMetaRow}>
                        <span className={styles.cardMetaLabel}>Origin</span>
                        <span>{origin.title}</span>
                    </span>
                    <span className={styles.cardMetaRow}>
                        <span className={styles.cardMetaLabel}>Type</span>
                        <span>{breadType.title}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
