import { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
  const [buttonText, setButtonText] = useState("Send");
  const [formErrors, setFormErrors] = useState([]);
  const [message, setMessage] = useState("");

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

    // if (!formDetails.phone.match(/^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/)) {
    //   errors.push("Введите номер телефона в формате +7 9XX-XXX-XX-XX.");
    // }

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
      return;
    }

    setFormErrors([]);
    setButtonText("Sending...");

    emailjs
      .sendForm("service_g6vo5zj", "template_btl4jgt", form.current, "O5WdxjyUfcxNbrwbt")
      .then(
        (result) => {
          setButtonText("Send");
          setMessage("Your message has been sent!");
          e.target.reset();
        },
        (error) => {
          setButtonText("Send");
          setMessage("An error occurred while sending the message. Please try again.");
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
                      type="email"
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
                <div className="error-messages">
                  {formErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              {message && <div className="success-message">{message}</div>}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
