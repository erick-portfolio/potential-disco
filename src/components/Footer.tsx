import React from 'react'

export interface FooterProps {
  isDarkMode: boolean
  brandText: string
  disclaimer: string
}

export function Footer ({ isDarkMode, brandText, disclaimer }: FooterProps): React.ReactElement {
  return (
    <div className={`container${isDarkMode ? ' dark-mode' : ''}`}>
      <footer className='py-3'>
        <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
          <li className='nav-item'>
            <a href='/' className='nav-link px-2 text-muted'>
              {brandText}
            </a>
          </li>
        </ul>
        <p className='text-center text-muted'>
          {disclaimer}
        </p>
      </footer>
    </div>
  )
}

export default Footer
