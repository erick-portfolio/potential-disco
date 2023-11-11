import React, { useEffect, useState } from 'react'
import SiteFeed from './SiteFeed'
import './RSS.css'
import cheerio from 'cheerio'
import { API } from 'aws-amplify'

interface InsidePackItem {
  title: string
  link: string
  pubDate: string
  author: string
}

interface InsidePackProps {
  title: string
  homepage: string
  isDarkMode: boolean
}

function InsidePack ({ homepage, title, isDarkMode }: InsidePackProps): React.ReactElement {
  const [items, setItems] = useState<InsidePackItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const responseRaw = await API.get('proxy', `/proxy?url=${encodeURIComponent('https://insidepacksports.com/premium/feed')}`, {})
      const response = responseRaw.feedContents.toString()
      const $ = cheerio.load(response)
      const feedArray: InsidePackItem[] = []
      $('.story.item').each((index, element) => {
        const feed: InsidePackItem = {
          author: $(element).find('.author-link').text(),
          link: homepage + ($(element).find('a').attr('href') ?? ''),
          pubDate: $(element).find('.details').clone().children().remove().end().text(),
          title: $(element).find('.title').text()
        }
        feedArray.push(feed)
      })

      setItems(feedArray)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching RSS feed', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [])

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
      items={items.map((item) => ({
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

export default InsidePack
