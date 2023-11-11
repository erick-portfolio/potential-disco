import React from 'react'
import type { RSSProps, RSSItem } from './RSSInterfaces'
import { useRSSFeed } from './useRSSFeed'
import SiteFeed from './SiteFeed'
import cheerio from 'cheerio'

// Transformation function specific to InsidePack
function transformInsidePackData (apiResponseRaw: any): RSSItem[] {
  const response = apiResponseRaw.feedContents.toString()
  const $ = cheerio.load(response)
  const feedArray: RSSItem[] = []

  $('.story.item').each((index, element) => {
    const feed: RSSItem = {
      author: $(element).find('.author-link').text(),
      link: $(element).find('a').attr('href') ?? '',
      pubDate: $(element).find('.details').clone().children().remove().end().text(),
      title: $(element).find('.title').text()
    }
    feedArray.push(feed)
  })

  return feedArray
}

// Refactored InsidePack Component
function InsidePack (props: RSSProps): React.ReactElement {
  const { items, isLoading, refresh } = useRSSFeed(props.url, transformInsidePackData)

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

export default InsidePack
