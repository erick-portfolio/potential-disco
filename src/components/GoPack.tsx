import './RSS.css'
import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import SiteFeed from './SiteFeed'

interface GoPackItem {
  title: string
  link: string
  pubDate: string
  author: string
}

interface GoPackProps {
  url: string
  title: string
  homepage: string
  isDarkMode: boolean
}

function GoPack ({ homepage, url, title, isDarkMode }: GoPackProps): React.ReactElement {
  const [items, setItems] = useState<GoPackItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await API.get('proxy', `/proxy?url=${encodeURIComponent(url)}`, {})
      const jsonData = response.feedContents
      const goPackItems: GoPackItem[] = jsonData.map((item: any) => ({
        title: item.title,
        link: 'https://gopack.com' + item.url,
        pubDate: item.content_date,
        author: item.writer ?? ''
      }))

      setItems(goPackItems)
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
    void fetchData()
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

export default GoPack
