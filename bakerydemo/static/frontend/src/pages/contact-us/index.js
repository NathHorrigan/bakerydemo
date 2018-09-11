import React from 'react'
import Layout from '@components/layout'
import StreamField from '@components/streamfield'
import styles from './contact-us.module.scss'

export default ({ data }) => {
    const contact = data.allPage.edges;
    return (
        <Layout>
            {contact.map(({ node }) => {
                return (
                    <div key={node.id} className={styles.container}>
                        <div className={styles.readingColumn}>
                            <h1>{node.title}</h1>
                            <StreamField blocks={node.body} />
                        </div>
                    </div>
                )
            })}
        </Layout>
    )
}

export const query = graphql`
    query ContactPageQuery {
        allPage(filter: { type: { eq: "FormPage" } }) {
            edges {
                node {
                    id
                    title
                    body {
                        ...StreamFieldBlock
                        type
                    }
                }
            }
        }
    }
`
