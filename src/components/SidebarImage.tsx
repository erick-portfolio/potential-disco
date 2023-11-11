import React, { useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

interface SidebarImageProps {
  path: string
  title: string
  isDarkMode: boolean
}

export function SidebarImage ({ path, title, isDarkMode }: SidebarImageProps): React.ReactElement {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = (): void => { setShowModal(true) }
  const handleCloseModal = (): void => { setShowModal(false) }

  return (
    <div>
      {/* Image Thumbnail as Card */}
      <Card
        style={{ width: '100%', cursor: 'pointer', backgroundColor: isDarkMode ? '#343a40' : '' }}
        onClick={handleOpenModal}
        className={isDarkMode ? 'text-white' : 'text-dark'}
      >
        <Card.Img variant='top' src={path} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>

      {/* Modal for Full Screen Image */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size='lg'
        centered
        contentClassName={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}
      >
        <Modal.Header closeButton className={isDarkMode ? 'bg-dark' : 'bg-light'}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={path} alt={title} className='img-fluid' />
        </Modal.Body>
        <Modal.Footer className={isDarkMode ? 'bg-dark' : 'bg-light'}>
          <Button variant={isDarkMode ? 'secondary' : 'primary'} onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SidebarImage
