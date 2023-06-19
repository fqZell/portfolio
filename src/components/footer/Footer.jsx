import NewsletterSubscribe from "../newsletter/NewsletterSubscribe";
import { faTelegram, faVk, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <>
        <footer className="footer">
        <Container>
            <Row className="align-items-center">
            <NewsletterSubscribe /> 
                <div className="social-icon">
                    <a href="https://t.me/giba1000" target='_blank'><FontAwesomeIcon className="icon" icon={faTelegram} size='xl' /></a>
                    <a href="https://vk.com/mukhametzyan0v" target='_blank'><FontAwesomeIcon className="icon" icon={faVk} size='xl' /></a>
                    <a href="https://github.com/fqZell" target='_blank'><FontAwesomeIcon className="icon" icon={faGithub} size='xl' /></a>
                </div>
                <p>© Mukhametzyanov</p>
            </Row>
        </Container>
        </footer>
        </>
    )
}

export default Footer;