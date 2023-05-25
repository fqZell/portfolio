import { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact/contact-img.svg";
import emailjs from '@emailjs/browser';
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';

export const ContactForm = () => {
  const form = useRef()

  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  // const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_g6vo5zj', 'template_btl4jgt', form.current, 'O5WdxjyUfcxNbrwbt')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setButtonText("Sending...");
  //   let response = await fetch("/api/contact", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify(formDetails),
  //   });
  //   setButtonText("Send");
  //   let result = await response.json();
  //   setFormDetails(formInitialDetails);
  //   if (result.code == 200) {
  //     setStatus({ succes: true, message: 'Сообщение отправлено успешно'});
  //   } else {
  //     setStatus({ succes: false, message: 'Что-то пошло не так, пожалуйста, повторите попытку позже.'});
  //   }
  // };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            {/* <TrackVisibility>
              {({ isVisible }) => */}
                <img 
                // className={isVisible ? "animate__animated animate__zoomIn" : ""} 
                src={contactImg} alt="Contact Us"/>
              {/* }
            </TrackVisibility> */}
          </Col>
          <Col size={12} md={6}>
            {/* <TrackVisibility>
              {({ isVisible }) => */}
                <div 
                // className={isVisible ? "animate__animated animate__fadeIn" : ""}
                >
                <h2>Свяжитесь с нами</h2>
                <form ref={form} onSubmit={sendEmail} /* onSubmit={handleSubmit} */>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="firstName" value={formDetails.firstName} placeholder="Имя" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" name="lastName" value={formDetails.lastName} placeholder="Фамилия" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" name="email" value={formDetails.email} placeholder="Почта" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" name="phone" value={formDetails.phone} placeholder="Телефон +7" onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" name="message" value={formDetails.message} placeholder="Ваше сообщение" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {/* {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    } */}
                  </Row>
                </form>
              </div>
              {/* }
            </TrackVisibility> */}
          </Col>
        </Row>
      </Container>
    </section>
  )
}