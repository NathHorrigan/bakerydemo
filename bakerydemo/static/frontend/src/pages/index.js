import React from 'react';
import Link from 'gatsby-link'
import Layout from '@components/layout'
import Hero from '@components/hero'
import StreamField from '@components/streamfield'

import { getMediaUrl } from '@util/urls'

import styles from './home.module.scss'

export default ({ data }) => {
    const homeData = data.allPage.edges;
    return (
        <Layout>
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
                                <Link to="/breads/appam-hoppers/" className={styles.homeBreadCard}>
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
                            <h2 className={[styles.homeSectionTitle, styles.homeSectionTitleCentered].join(' ')}>{node.featuredSection2Title}</h2>
                            <div className={styles.homeFeatures}>
                                <Link to="/locations/new-york/" className={styles.homeLocationCard}>
                                    <figure className={styles.homeLocationCardImageContainer}>
                                        <img className={styles.homeLocationCardImage} src={getMediaUrl('/media/images/hof-cornell-university-filter.df5c97ba.fill-430x210-c100.jpg')} />
                                    </figure>
                                    <div className={styles.homeLocationCardMeta}>
                                        <h3 className={styles.homeLocationCardTitle}>Hof</h3>
                                        <p>Pie gingerbread cake caramels chocolate cake tiramisu wafer. Gummi bears chupa chups chocolate. Topping chupa ...</p>
                                    </div>
                                </Link>
                                <Link to="/locations/reykjavik/" className={styles.homeLocationCard}>
                                    <figure className={styles.homeLocationCardImageContainer}>
                                        <img className={styles.homeLocationCardImage} src={getMediaUrl('/media/images/reykjavik-sverrir-thorolfsson.2e16d0ba.fill-430x210-c100.jpg')} />
                                    </figure>
                                    <div className={styles.homeLocationCardMeta}>
                                        <h3 className={styles.homeLocationCardTitle}>Reykjavik</h3>
                                        <p>Ice cream pie tiramisu carrot cake pie macaroon brownie wafer. Cupcake cookie cotton candy jelly-o ...</p>
                                    </div>
                                </Link>
                                <Link to="/locations/london/" className={styles.homeLocationCard}>
                                    <figure className={styles.homeLocationCardImageContainer}>
                                        <img className={styles.homeLocationCardImage} src={getMediaUrl('/media/images/vik.2e16d0ba.fill-430x210-c100.jpg')} />
                                    </figure>
                                    <div className={styles.homeLocationCardMeta}>
                                        <h3 className={styles.homeLocationCardTitle}>Vik</h3>
                                        <p>Chocolate bar tiramisu toffee. Topping pie powder candy canes jujubes liquorice. Apple pie muffin marshmallow ...</p>
                                    </div>
                                </Link>
                            </div>

                            <h2 className={[styles.homeSectionTitle, styles.homeSectionTitleCentered].join(' ')}>{node.featuredSection3Title}</h2>
                            <div className={styles.homeFeatures}>
                                <Link to="/blog/wild-yeast/" className={styles.homeBlogCard}>
                                    <figure className={styles.homeBlogCardImageContainer}>
                                        <img className={styles.homeBlogCardImage} src={getMediaUrl('/media/images/yeast.2e16d0ba.fill-430x254-c100.jpg')} />
                                    </figure>
                                    <h3 className={styles.homeBlogCardTitle}>Tracking Wild Yeast</h3>
                                </Link>

                                <Link to="/blog/bread-circuses/" className={styles.homeBlogCard}>
                                    <figure className={styles.homeBlogCardImageContainer}>
                                        <img className={styles.homeBlogCardImage} src={getMediaUrl('/media/images/Bedouins_making_bread.2e16d0ba.fill-430x254-c100.jpg')} />
                                    </figure>
                                    <h3 className={styles.homeBlogCardTitle}>Bread and Circuses</h3>
                                </Link>

                                <Link to="/blog/icelandic-baking/" className={styles.homeBlogCard}>
                                    <figure className={styles.homeBlogCardImageContainer}>
                                        <img className={styles.homeBlogCardImage} src={getMediaUrl('/media/images/Olandshvedebrod_6082070226.2e16d0ba.fill-430x254-c100.jpg')} />
                                    </figure>
                                    <h3 className={styles.homeBlogCardTitle}>The Great Icelandic Baking Show</h3>
                                </Link>

                                <Link to="/blog/joy-baking-soda/" className={styles.homeBlogCard}>
                                    <figure className={styles.homeBlogCardImageContainer}>
                                        <img className={styles.homeBlogCardImage} src={getMediaUrl('/media/images/bakingsoda.2e16d0ba.fill-430x254-c100.jpg')} />
                                    </figure>
                                    <h3 className={styles.homeBlogCardTitle}>The Joy of (Baking) Soda</h3>
                                </Link>

                                <Link to="/blog/sliced-bread/" className={styles.homeBlogCard}>
                                    <figure className={styles.homeBlogCardImageContainer}>
                                        <img className={styles.homeBlogCardImage} src={getMediaUrl('/media/images/sliced.2e16d0ba.fill-430x254-c100.jpg')} />
                                    </figure>
                                    <h3 className={styles.homeBlogCardTitle}>The Greatest Thing Since Sliced Bread</h3>
                                </Link>


                                <Link to="/blog/desserts-benefits/" className={styles.homeBlogCard}>
                                    <figure className={styles.homeBlogCardImageContainer}>
                                        <img className={styles.homeBlogCardImage} src={getMediaUrl('/media/images/bostoncream.2e16d0ba.fill-430x254-c100.jpg')} />
                                    </figure>
                                    <h3 className={styles.homeBlogCardTitle}>Desserts with Benefits</h3>
                                </Link>


                            </div>
                        </div>
                    </div>
                )
            })}
        </Layout>
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
