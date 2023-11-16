// import { Websites, SidebarImage, Schedule } from './index'
import { Websites, Schedule } from './index'
import type { WebsiteConfig } from './index'
import React from 'react'

interface ContentProps {
  isDarkMode: boolean
  rssConfig: WebsiteConfig[]

}

export function Content ({ isDarkMode, rssConfig }: ContentProps): React.ReactElement {
  return (
    <div
      className={`Content ${isDarkMode ? 'dark' : ''}`}
      style={{ paddingLeft: '20px', paddingRight: '20px' }}
    >
      <div className=''>
        <div className='row'>
          <div className='col-md-2'>
            <div className='row'>
              <Schedule isDarkMode={isDarkMode} />
            </div>
            {/* <div className='row'>
              <SidebarImage isDarkMode={isDarkMode} path='/pack-chronicle-logo.png' title='AI Generated Art 1' />
            </div>
            <div className='row'>
              <SidebarImage isDarkMode={isDarkMode} path='/pack-chronicle-navbar-logo.png' title='AI Generated Art 2' />
            </div> */}
          </div>
          <div className='col-md-10'>
            <Websites
              rssConfig={rssConfig}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
