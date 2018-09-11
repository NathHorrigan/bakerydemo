import { graphql } from 'gatsby'

export const StreamFieldBlock = graphql`
    fragment StreamFieldBlock on body_2 {
        type
        value {
            content
            heading_text
            size
        }
    }
`