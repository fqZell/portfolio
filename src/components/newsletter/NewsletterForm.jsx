import React, { useState, useEffect } from "react";
import { Col, Row, Alert, Modal, Button } from "react-bootstrap";

export const NewsletterForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      clearFields();
    } else if (status === 'error') {
      setErrorMessage(message);
      setShowModal(true);
      setTimeout(() => {
        setErrorMessage('');
        setShowModal(false);
      }, 5000);
    }
  }, [status, message])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || email.indexOf("@") === -1) {
      setErrorMessage('Пожалуйста, введите корректный адрес электронной почты.');
      setShowModal(true);
      setTimeout(() => {
        setErrorMessage('');
        setShowModal(false);
      }, 5000);
      return;
    }

    setErrorMessage('');
    onValidated({
      EMAIL: email
    });
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
      <Col lg={12}>
        <div className="newsletter-bx wow slideInUp">
          <Row>
            <Col lg={12} md={6} xl={5}>
              <h3>Подпишитесь на нашу рассылку<br></br> & Никогда не пропускайте последние обновления</h3>
              {status === 'sending' && <Alert>Sending...</Alert>}
              {status === 'success' && <Alert variant="success">{message}</Alert>}
              {status === 'error' && <Alert variant="danger">{message}</Alert>}
            </Col>
            <Col md={6} xl={7}>
              <form onSubmit={handleSubmit}>
                <div className="new-email-bx">
                  <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Почта" />
                  <button type="submit">Отправить</button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
        {errorMessage && (
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="modal_title">Ошибка</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal_body">{errorMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Закрыть
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Col>
  )
}