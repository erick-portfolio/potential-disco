import './Feed.css'
import { Timeline } from 'react-twitter-widgets'
import React from 'react'

interface FeedProps {
  isDarkMode: boolean
  dataSource: {
    sourceType: string
    ownerScreenName: string
    slug: string
  }
}

export function Feed ({ isDarkMode, dataSource }: FeedProps): React.ReactElement {
  const darkModeOptions = {
    height: '1600',
    theme: 'dark',
    chrome: 'noheader nofooter transparent noscrollbar'
  }

  const lightModeOptions = {
    height: '1600',
    theme: 'light',
    chrome: 'noheader nofooter transparent noscrollbar'
  }

  return (
    <div className='mt-5'>
      <div style={{ display: isDarkMode ? 'none' : 'block' }}>
        <Timeline dataSource={dataSource} options={lightModeOptions} />
      </div>
      <div style={{ display: isDarkMode ? 'block' : 'none' }}>
        <Timeline dataSource={dataSource} options={darkModeOptions} />
      </div>
    </div>
  )
}

export default Feed
