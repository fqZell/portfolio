import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/img/logo/logo.svg"
import { faTelegram, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    useEffect(() => {
      const onScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
  
      window.addEventListener("scroll", onScroll);
  
      return () => window.removeEventListener("scroll", onScroll);
    }, [])
  
    const onUpdateActiveLink = (value) => {
      setActiveLink(value);
    }

    return (
        <>
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="/">
                <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className={isMenuOpen ? "navbar-toggler-icon open" : "navbar-toggler-icon"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <NavLink to={"/"} className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
                    onClick={() => onUpdateActiveLink('home')}>
                        Главная
                    </NavLink>
                    <NavLink to={"/projects"} className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} 
                    onClick={() => onUpdateActiveLink('skills')}>
                        Проекты
                    </NavLink>
                    <NavLink to={"/"} className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} 
                    onClick={() => onUpdateActiveLink('projects')}>
                        Калькулятор
                    </NavLink>
                </Nav>
                <span className="navbar-text">
                <div className="social-icon">
                    <a href="#"><FontAwesomeIcon className="icon" icon={faTelegram} size='xl' /></a>
                    <a href="#"><FontAwesomeIcon className="icon" icon={faVk} size='xl' /></a>
                    <a href="#"><FontAwesomeIcon className="icon" icon={faInstagram} size='xl' /></a>
                </div>
                <a href="#connect"><button className="vvd"><span>Давайте свяжемся</span></button></a>
                </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default Header;