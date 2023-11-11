import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react'

interface NavBarProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  brandText: string
}

export function NavBar ({ isDarkMode, toggleDarkMode, brandText }: NavBarProps): React.ReactElement {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant={isDarkMode ? 'dark' : 'light'}
      bg={isDarkMode ? 'dark' : 'light'}
    >
      <Container style={{ maxWidth: 'inherit' }}>
        <Navbar.Brand href='/' style={{
          color: 'rgb(214, 40, 40)',
          fontSize: '30px',
          fontWeight: 'bold'
        }}>{brandText}</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='https://github.com/erick-portfolio/potential-disco'>Source Code</Nav.Link>
          </Nav>
          <Nav>
            {/* Toggle Dark Mode Button */}
            <button
              style={{ whiteSpace: 'nowrap' }}
              className={`btn btn-outline-${isDarkMode ? 'light' : 'dark'}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
