import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

interface SidebarImageProps {
    path: string;
    title: string;
    isDarkMode: boolean;
  }
  
  export function SidebarImage({ path, title, isDarkMode }: SidebarImageProps) {
    const [showModal, setShowModal] = useState(false);
  
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  
    return (
      <div>
        {/* Image Thumbnail as Card */}
        <Card style={{ width: '100%', cursor: 'pointer' }} onClick={handleOpenModal}>
          <Card.Img variant="top" src={path} alt={title} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
        </Card>
  
        {/* Modal for Full Screen Image */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={path} alt={title} className="img-fluid" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant={isDarkMode ? "secondary" : "primary"} onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  export default SidebarImage;