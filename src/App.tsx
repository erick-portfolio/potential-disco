import './App.css'
import React, { useState, useEffect } from 'react'
import { NavBar, Footer, Content } from './components'

interface AppProps {
  twitterFeedConfig: {
    sourceType: string
    ownerScreenName: string
    slug: string
  }
  rssConfig: Array<{
    url: string
    homepage: string
    title: string
  }>
  brandText: string
  disclaimer: string
}

function App ({ twitterFeedConfig, rssConfig, brandText, disclaimer }: AppProps): React.ReactElement { // Add space before function parentheses
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true'
  ) // Remove extra semicolon

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode)
  } // Remove extra semicolon

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode.toString())
  }, [isDarkMode]) // Remove extra semicolon

  return (
    <div className={`App${isDarkMode ? ' dark-mode' : ''}`}>
      <NavBar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        brandText={brandText}
      />
      <Content isDarkMode={isDarkMode} rssConfig={rssConfig} twitterFeedConfig={twitterFeedConfig} />
      <Footer isDarkMode={isDarkMode} brandText={brandText} disclaimer={disclaimer} />
    </div>
  ) // Remove extra semicolon
}

export default App // Remove extra semicolon
