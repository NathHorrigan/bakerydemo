import React from 'react'

import { ParagraphBlock, HeadingBlock, QuoteBlock } from './blocks'

export default ({ blocks }) => blocks.map(block => {
  switch (block.type) {

    case 'heading_block':
      return <HeadingBlock key={block.value} content={block.value['heading_text']} size={block.value.size} />

    case 'paragraph_block':
      return <ParagraphBlock key={block.value} content={block.value.content} />

    case 'block_quote':
      return <QuoteBlock key={block.value.text} quote={block.value.text} cite={block.value.attribute_name} />

    default:
      return <h3>Unknown Block Type: {block.type}</h3>
  }
})
