import React from 'react';
import Link from 'gatsby-link'

import Hero from '@components/hero'
import StreamField from '@components/streamfield'

import { getMediaUrl } from '@util/urls'

import styles from './home.module.scss'

export default ({ data }) => {
    const homeData = data.allPage.edges;

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
                            <div>
                                <h2 className={styles.homeSectionTitle}>{node.featuredSection1Title}</h2>
                                <Link to="/breads/anadama-bread/" className={styles.homeBreadCard}>
                                    <img className={styles.homeBreadCardImage} src={getMediaUrl('/media/images/Anadama_bread_1.2e16d0ba.fill-500x500.jpg')} />
                                    <h3 className={styles.homeBreadCardTitle}>Anadama</h3>
                                </Link>
                                <Link to="/breads/anpam/" className={styles.homeBreadCard}>
                                    <img className={styles.homeBreadCardImage} src={getMediaUrl('/media/images/Bean-jam-bunanpankatori-cityjapan.2e16d0ba.fill-500x500.jpg')} />
                                    <h3 className={styles.homeBreadCardTitle}>Anpan</h3>
                                </Link>
                                <Link to="/breads/appam/" className={styles.homeBreadCard}>
                                    <img className={styles.homeBreadCardImage} src={getMediaUrl('/media/images/Appam_served_with_Coconut_Milk_in_.2e16d0ba.fill-500x500.jpg')} />
                                    <h3 className={styles.homeBreadCardTitle}>Appam</h3>
                                </Link>
                                <Link to="/breads/arepa/" className={styles.homeBreadCard}>
                                    <img className={styles.homeBreadCardImage} src={getMediaUrl('/media/images/Arepa_asada.2e16d0ba.fill-500x500.jpg')} />
                                    <h3 className={styles.homeBreadCardTitle}>Arepa</h3>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.homeCopySection}>
                            <div className={styles.homeCopy}>
                                <StreamField key={node.id} blocks={node.body} />
                            </div>
                        </div>
                        <div className={styles.container}>
                            <h2>{node.featuredSection2Title}</h2>
                            <h2>{node.featuredSection3Title}</h2>
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
                    body {
                        ...StreamFieldBlock
                    }
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
                    featuredSection1Title
                    featuredSection2Title
                    featuredSection3Title
                }
            }
        }
    }
`
