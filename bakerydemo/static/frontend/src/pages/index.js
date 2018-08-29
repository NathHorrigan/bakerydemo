import React from 'react';

import Hero from '@components/hero'
import { StreamFieldBlock } from '../fragments'

import { getMediaUrl } from '@util/urls'

import styles from './home.module.scss'

export default ({ data }) => {
    const homeData = data.allPage.edges;
    console.log(homeData);

    return (
        <div>
            {homeData.map(({ node }) => {
                return (
                    <div key={node.id}>
                        <Hero
                            image={getMediaUrl(node.image.file.original)}
                            title={node.title}
                            subtitle={node.heroText}
                            modifier={styles.homeHero}
                            ctaText={node.heroCta}
                            ctaLink={node.heroCtaLink.urlPath}
                        />
                        <div className={[styles.container, styles.homeColumns].join(' ')}>
                            <div className={styles.homeCtaBlock}>
                                <img className={styles.homeCtaBlockImage} src={getMediaUrl(node.promoImage.file.thumbnail)} alt="" />
                                <h3 className={styles.homeCtaBlockTitle}>{node.promoTitle}</h3>
                                <p className={styles.homeCtaBlockCopy} dangerouslySetInnerHTML={{ __html: node.promoText }} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export const query = graphql`
    query HomePageQuery {
        allPage(filter: { type: { eq: "HomePage" } }) {
            edges {
                node {
                    id
                    title
                    heroText
                    heroCta
                    heroCtaLink {
                        urlPath
                    }
                    image {
                        file {
                            original
                        }
                    }
                    promoText
                    promoTitle
                    promoImage {
                        file {
                            thumbnail
                        }
                    }
                }
            }
        }
    }
`
