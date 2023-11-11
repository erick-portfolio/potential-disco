import './RSS.css'
import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import cheerio from 'cheerio'
import SiteFeed from './SiteFeed'

interface CBSSportsItem {
  title: string
  link: string
  pubDate: string
  author: string
}

interface CBSSportsProps {
  url: string
  title: string
  homepage: string
  isDarkMode: boolean
}

function CBSSports ({ homepage, url, title, isDarkMode }: CBSSportsProps): React.ReactElement {
  const [items, setItems] = useState<CBSSportsItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const apiResponseRaw = await API.get('proxy', `/proxy?url=${encodeURIComponent(url)}`, {})
      const $ = cheerio.load(apiResponseRaw.feedContents)
      const itemElements = $('.NewsFeed-item')

      const rssItems: CBSSportsItem[] = []

      itemElements.each((_index, element) => {
        const title = $(element).find('.NewsFeed-title').text().trim()
        const link = 'https://cbssports.com/' + ($(element).find('.NewsFeed-title a').attr('href') ?? '')
        const pubDate = $(element).find('.NewsFeed-date').text().trim()
        const author = $(element).find('.NewsFeed-author').text().trim()

        rssItems.push({ title, link, pubDate, author })
      })

      setItems(rssItems)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching RSS feed', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [url])

  const handleRefresh = (): void => {
    setIsLoading(true)
    fetchData().catch((error) => {
      console.error('Error refreshing data', error)
    })
  }

  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.author
      }))}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  )
}

export default CBSSports
