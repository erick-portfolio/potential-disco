import React from 'react'
import ContentFeed from './ContentFeed'

interface WebsitesProps {
  isDarkMode: boolean
  rssConfig: WebsiteConfig[]
}

export interface WebsiteConfig {
  homepage: string
  title: string
  s3FileKey: string
}

export function Websites ({ isDarkMode, rssConfig }: WebsitesProps): React.ReactElement {
  return (
    <div className='album py-5'>
      <div className='row'>
        {rssConfig.map(({ homepage, title, s3FileKey }, index) => (
          <div key={index} className='col-md-4'>
            <ContentFeed
              homepage={homepage}
              title={title}
              isDarkMode={isDarkMode}
              s3FileKey={s3FileKey}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Websites
