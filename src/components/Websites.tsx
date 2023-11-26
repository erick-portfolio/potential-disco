import React, { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import ContentFeed from './ContentFeed'
import type { S3ProviderListOutputItem } from '@aws-amplify/storage'
import type { Article } from './SiteFeed'

export interface WebsiteData {
  homepage: string
  sourceTitle: string
  feed: Article[]
}

interface WebsitesProps {
  isDarkMode: boolean
}

export const Websites = ({ isDarkMode }: WebsitesProps): React.ReactElement => {
  const [websiteData, setWebsiteData] = useState<WebsiteData[]>([])

  useEffect(() => {
    const fetchS3FileList = async (): Promise<void> => {
      try {
        const s3Data = await Storage.list('')
        const contentJsonFiles = s3Data.results.filter((file): file is S3ProviderListOutputItem => file.key !== undefined && file.key.endsWith('.content.json'))

        const websiteDataPromises = contentJsonFiles.map(async (file) => {
          const fileResponse = await Storage.get(file.key as string, { download: true })
          let jsonData
          if ('Body' in fileResponse) {
            const body = await (fileResponse.Body as Blob).text()
            jsonData = JSON.parse(body)
          } else {
            jsonData = JSON.parse(fileResponse as unknown as string)
          }
          return jsonData
        })

        const websites = await Promise.all(websiteDataPromises)
        setWebsiteData(websites)
      } catch (error) {
        console.error('Error fetching S3 files', error)
      }
    }

    fetchS3FileList().catch(console.error)
  }, [])

  return (
    <div className='album py-5'>
      <div className='row'>
        {websiteData.map((site, index) => (
          <div key={index} className='col-md-4'>
            <ContentFeed
              homepage={site.homepage}
              title={site.sourceTitle}
              articles={site.feed}
              isDarkMode={isDarkMode}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Websites
