import './App.css'
import React, { useState, useEffect } from 'react'
import { NavBar, Footer, Content } from './components'
import type { WebsiteConfig } from './components'
interface AppProps {
  rssConfig: WebsiteConfig[]
  brandText: string
  disclaimer: string
}

function App ({ rssConfig, brandText, disclaimer }: AppProps): React.ReactElement { // Add space before function parentheses
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
      <Content isDarkMode={isDarkMode} rssConfig={rssConfig} />
      <Footer isDarkMode={isDarkMode} brandText={brandText} disclaimer={disclaimer} />
    </div>
  ) // Remove extra semicolon
}

export default App // Remove extra semicolon
