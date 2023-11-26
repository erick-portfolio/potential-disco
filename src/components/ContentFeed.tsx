import React from 'react'
import type { FC } from 'react'
import SiteFeed from './SiteFeed'
import type { Article } from './SiteFeed'

interface ContentFeedProps {
  title: string
  homepage: string
  isDarkMode: boolean
  articles: Article[]
}

const ContentFeed: FC<ContentFeedProps> = ({ title, homepage, isDarkMode, articles }) => {
  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={articles}
    />
  )
}

export default ContentFeed
