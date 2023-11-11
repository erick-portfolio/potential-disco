import React, { useState, useEffect } from 'react'
import { fetchFeed, parseFeed } from './feedUtils'
import SiteFeed from './SiteFeed'
import type { RSSItem as Item } from './RSSInterfaces'

interface Props {
  url: string
  title: string
  homepage: string
  isDarkMode: boolean
}

function RSSAtom ({ url, title, homepage, isDarkMode }: Props): React.ReactElement {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (): Promise<void> => {
    try {
      const xml = await fetchFeed(url)
      const newItems = parseFeed(xml)
      setItems(newItems)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [url])

  const handleRefresh = (): void => {
    setIsLoading(true)
    fetchData().catch((error) => {
      console.error('Error refreshing data:', error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <SiteFeed
      key={title}
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  )
}

export default RSSAtom
