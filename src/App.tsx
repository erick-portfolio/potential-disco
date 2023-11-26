import './App.css'
import React, { useState, useEffect } from 'react'
import { NavBar, Footer, Content } from './components'
interface AppProps {
  brandText: string
  disclaimer: string
}

function App ({ brandText, disclaimer }: AppProps): React.ReactElement {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true'
  )

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode.toString())
  }, [isDarkMode])

  return (
    <div className={`App${isDarkMode ? ' dark-mode' : ''}`}>
      <div className="background-image-wrapper"></div>
      <div className={isDarkMode ? 'dark-overlay' : 'light-overlay'}></div>
      <div className="content-wrapper">
        <NavBar
          isDarkMode={isDarkMode}
          toggleDarkMode={() => { setIsDarkMode(!isDarkMode) }}
          brandText={brandText}
        />
        <Content isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} brandText={brandText} disclaimer={disclaimer} />
      </div>
    </div>
  )
}

export default App
