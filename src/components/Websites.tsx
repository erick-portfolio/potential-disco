import React from 'react'
import ContentFeed from './ContentFeed'

interface WebsitesProps {
  isDarkMode: boolean
}

export function Websites ({ isDarkMode }: WebsitesProps): React.ReactElement {
  return (
    <div className='album py-5'>
      <div className='row'>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://www.backingthepack.com/'
            title='Backing The Pack'
            isDarkMode={isDarkMode}
            s3FileKey='BackingThePack.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://packinsider.com/'
            title='Pack Insider'
            isDarkMode={isDarkMode}
            s3FileKey='PackInsider.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://bustingbrackets.com/acc/nc-state-wolfpack/'
            title='Busting Brackets'
            isDarkMode={isDarkMode}
            s3FileKey='BustingBrackets.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://gopack.com/'
            title='Go Pack'
            isDarkMode={isDarkMode}
            s3FileKey='GoPack.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://www.on3.com/teams/nc-state-wolfpack/'
            title='The Wolfpacker'
            isDarkMode={isDarkMode}
            s3FileKey='Wolfpacker.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/'
            title='CBS Sports'
            isDarkMode={isDarkMode}
            s3FileKey='CBSSports.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://www.technicianonline.com/'
            title='Technician'
            isDarkMode={isDarkMode}
            s3FileKey='Technician.content.json'
          />
        </div>
        <div className='col-md-4'>
          <ContentFeed
            homepage='https://insidepacksports.com/'
            title='Inside Pack Sports'
            isDarkMode={isDarkMode}
            s3FileKey='InsidePack.content.json'
          />
        </div>
      </div>
    </div>
  )
}

export default Websites
