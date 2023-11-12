import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import dotenv from 'dotenv'
dotenv.config()
const twitterFeedConfig = JSON.parse(process.env.REACT_APP_TWITTER_FEED_CONFIG!)
const rssConfig = JSON.parse(process.env.REACT_APP_RSS_CONFIG!)
const brandText = process.env.REACT_APP_NAME!
const disclaimer = process.env.REACT_APP_DISCLAIMER!

test('renders learn react link', () => {
  render(<App rssConfig={rssConfig} twitterFeedConfig={twitterFeedConfig} brandText={brandText} disclaimer={disclaimer}/>)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
