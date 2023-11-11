// useRSSFeed.tsx
import { useState, useEffect } from 'react'
import type { RSSItem } from './RSSInterfaces'
import { fetchRSSData } from './RSSUtils'

// useRSSFeed.tsx
export function useRSSFeed (url: string, transformFunction: (data: any) => RSSItem[]): { items: RSSItem[], isLoading: boolean, refresh: () => void } {
  const [items, setItems] = useState<RSSItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    setIsLoading(true)
    const data = await fetchRSSData(url, transformFunction)
    setItems(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData().catch(console.error)
  }, [url])

  const handleRefresh = (): void => {
    setIsLoading(true)
    fetchData().catch((error) => {
      console.error('Error refreshing data', error)
    })
  }
  return { items, isLoading, refresh: handleRefresh }
}
