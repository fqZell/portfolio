import NewsletterSubscribe from "../newsletter/NewsletterSubscribe";
import { faTelegram, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <>
        <footer className="footer">
        <Container>
            <Row className="align-items-center">
            <NewsletterSubscribe /> 
                <div className="social-icon">
                    <a href="#"><FontAwesomeIcon className="icon" icon={faTelegram} size='xl' /></a>
                    <a href="#"><FontAwesomeIcon className="icon" icon={faVk} size='xl' /></a>
                    <a href="#"><FontAwesomeIcon className="icon" icon={faInstagram} size='xl' /></a>
                </div>
                <p>© SALAHIEV</p>
            </Row>
        </Container>
        </footer>
        </>
    )
}

export default Footer;