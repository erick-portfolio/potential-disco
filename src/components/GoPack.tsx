import React from 'react'
import type { RSSProps, RSSItem } from './RSSInterfaces'
import { useRSSFeed } from './useRSSFeed'
import SiteFeed from './SiteFeed'

// Transformation function specific to GoPack
function transformGoPackData (apiResponseRaw: any): RSSItem[] {
  const jsonData = apiResponseRaw.feedContents
  return jsonData.map((item: any) => ({
    title: item.title,
    link: 'https://gopack.com' + item.url,
    pubDate: item.content_date,
    author: item.writer ?? ''
  }))
}

// Refactored GoPack Component
function GoPack (props: RSSProps): React.ReactElement {
  const { items, isLoading, refresh } = useRSSFeed(props.url, transformGoPackData)

  return (
    <SiteFeed
      title={props.title}
      homepage={props.homepage}
      isDarkMode={props.isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={refresh}
    />
  )
}

export default GoPack
