import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import dotenv from 'dotenv'
dotenv.config()
const brandText = process.env.REACT_APP_NAME!
const disclaimer = process.env.REACT_APP_DISCLAIMER!

test('renders learn react link', () => {
  render(<App brandText={brandText} disclaimer={disclaimer}/>)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
