import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import contactImg from "../../assets/img/contact/contact-img.svg";
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
  const form = useRef();

  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Отправить");
  const [formErrors, setFormErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const onFormUpdate = (fieldName, value) => {
    setFormDetails((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formDetails.firstName.match(/^[а-яА-Я]+$/)) {
      errors.push("Имя должно содержать только символы на кириллице без использования цифр");
    }

    if (!formDetails.lastName.match(/^[а-яА-Я]+$/)) {
      errors.push("Фамилия должна содержать только символы на кириллице без использования цифр");
    }

    if (!formDetails.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.push("Введите действительный адрес электронной почты.");
    }

    if (!formDetails.phone.match(/^[+0-9]+$/) || formDetails.phone.length < 11 || formDetails.phone.length > 13) {
      errors.push("Поле с телефоном должно содержать только цифры и знак '+', так же, должно содержать 11 символов");
    }    

    if (formDetails.message.length < 5 || formDetails.message.length > 100) {
      errors.push("Сообщение должно содержать от 5 до 100 символов.");
    }

    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
  
    const errors = validateForm();
  
    if (errors.length > 0) {
      setFormErrors(errors);
      setShowModal(true);
      return;
    }
  
    setFormErrors([]);
    setButtonText("Отправление...");
  
    emailjs
      .sendForm("service_g6vo5zj", "template_btl4jgt", form.current, "O5WdxjyUfcxNbrwbt")
      .then(
        (result) => {
          setButtonText("Отправить");
          setMessage("Ваше сообщение отправлено!");
          setShowModal(true);
          form.current.reset(); // Сбросить форму
          setFormDetails(formInitialDetails); // Обновить состояние формы
        },
        (error) => {
          setButtonText("Отправить");
          setMessage("При отправке сообщения произошла ошибка. Пожалуйста, попробуйте еще раз.");
          setShowModal(true);
        }
      );
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col size={12} md={6}>
            <div>
              <h2>Свяжитесь с нами</h2>
              <form ref={form} onSubmit={sendEmail}>
                <Row>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      type="text"
                      name="firstName"
                      value={formDetails.firstName}
                      placeholder="Имя"
                      onChange={(e) => onFormUpdate("firstName", e.target.value)}
                    />
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      type="text"
                      name="lastName"
                      value={formDetails.lastName}
                      placeholder="Фамилия"
                      onChange={(e) => onFormUpdate("lastName", e.target.value)}
                    />
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      type="text"
                      name="email"
                      value={formDetails.email}
                      placeholder="Почта"
                      onChange={(e) => onFormUpdate("email", e.target.value)}
                    />
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      type="tel"
                      name="phone"
                      value={formDetails.phone}
                      placeholder="+7 912-345-67-89"
                      onChange={(e) => onFormUpdate("phone", e.target.value)}
                    />
                  </Col>
                  <Col size={12} className="px-1">
                    <textarea
                      rows="6"
                      name="message"
                      value={formDetails.message}
                      placeholder="Ваше сообщение"
                      onChange={(e) => onFormUpdate("message", e.target.value)}
                    ></textarea>
                    <button type="submit">
                      <span>{buttonText}</span>
                    </button>
                  </Col>
                </Row>
              </form>
              {formErrors.length > 0 && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                  <Modal.Header closeButton>
                    <Modal.Title className="modal_title">Ошибка</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal_body">
                    {formErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Закрыть
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
              {message && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                  <Modal.Header closeButton>
                    <Modal.Title className="modal_title">Успешно</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal_body">{message}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Закрыть
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};