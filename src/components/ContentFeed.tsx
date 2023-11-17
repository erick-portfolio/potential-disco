import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import SiteFeed from './SiteFeed'
import type { RSSItem } from '.'
import { Storage } from 'aws-amplify'

interface ContentFeedProps {
  title: string
  homepage: string
  isDarkMode: boolean
  s3FileKey: string
}

const ContentFeed: FC<ContentFeedProps> = ({ title, homepage, isDarkMode, s3FileKey }) => {
  const [items, setItems] = useState<RSSItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      try {
        // use Storage to list all s3 files in the bucket
        const data = await Storage.get(s3FileKey, { download: true })
        if ('Body' in data) {
          const body = await (data.Body as Blob).text()
          setItems(JSON.parse(body))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData() // Using 'void' to ignore floating promises
  }, [s3FileKey])

  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items}
      isLoading={isLoading}
    />
  )
}

export default ContentFeed
