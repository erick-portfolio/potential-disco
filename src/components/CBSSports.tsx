import React from 'react'
import type { RSSProps, RSSItem } from './RSSInterfaces'
import { useRSSFeed } from './useRSSFeed'
import SiteFeed from './SiteFeed'
import cheerio from 'cheerio'

// The transformation function specific to CBSSports
function transformCBSData (apiResponseRaw: any): RSSItem[] {
  const $ = cheerio.load(apiResponseRaw.feedContents)
  const itemElements = $('.NewsFeed-item')

  // Transform and return the items in the required format
  return itemElements.map((_index, element) => {
    const title = $(element).find('.NewsFeed-title').text().trim()
    const link = 'https://cbssports.com/' + ($(element).find('.NewsFeed-title a').attr('href') ?? '')
    const pubDate = $(element).find('.NewsFeed-date').text().trim()
    const author = $(element).find('.NewsFeed-author').text().trim()

    return { title, link, pubDate, author }
  }).get()
}

// Refactored CBSSports Component
function CBSSports (props: RSSProps): React.ReactElement {
  const { items, isLoading, refresh } = useRSSFeed(props.url, transformCBSData)

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

export default CBSSports
