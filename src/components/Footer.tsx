import React from 'react'

export interface FooterProps {
  isDarkMode: boolean
  brandText: string
  disclaimer: string
}

export function Footer ({ isDarkMode, brandText, disclaimer }: FooterProps): React.ReactElement {
  return (
    <div className='container'>
      <footer className={`py-3 ${isDarkMode ? 'dark-mode' : ''}`}>
        <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
          <li className='nav-item'>
            <div className='px-2'>
              {brandText}
            </div>
          </li>
        </ul>
        <p className='text-center'>
          {disclaimer}
        </p>
      </footer>
    </div>
  )
}

export default Footer
