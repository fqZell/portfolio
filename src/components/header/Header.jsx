import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../../assets/img/logo/logo.svg"
import { useTheme } from "../../hooks/use-theme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme()

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
  
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
                    style={{ border: 'inherit' }}
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
                    onClick={() => onUpdateActiveLink('projects')}>
                        Проекты
                    </NavLink>
                    <NavLink to={"/calculator"} className={activeLink === 'calculator' ? 'active navbar-link' : 'navbar-link'} 
                    onClick={() => onUpdateActiveLink('calculator')}>
                        Калькулятор
                    </NavLink>
                </Nav>
                <span className="navbar-text">
                <div className="social-icon">
                    <a href="#"><FontAwesomeIcon className="icon" icon={faTelegram} size='xl' /></a>
                    <a href="#"><FontAwesomeIcon className="icon" icon={faVk} size='xl' /></a>
                    <a href="#"><FontAwesomeIcon className="icon" icon={faInstagram} size='xl' /></a>
                </div>
                <FontAwesomeIcon className="iconSun" icon={faSun} size='xl'></FontAwesomeIcon>
                <div className="theme-switcher">
                    <input type="checkbox" id="theme-toggle" onChange={handleThemeToggle} checked={theme === 'dark'} />
                    <label htmlFor="theme-toggle"></label>
                </div>
                <FontAwesomeIcon className="iconMonn" icon={faMoon} size='xl'></FontAwesomeIcon>
                </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}

export default Header;
