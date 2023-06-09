import React from 'react';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../../assets/img/logo/logo.svg";
import { useTheme } from "../../hooks/use-theme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import firebase from 'firebase/compat/app';
import AddProjectButton from '../addProject/AddProjectButton';

const Header = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyC1DULNiRTBQESpdnOKvcKezAHIH7hp96I",
        authDomain: "portfolioauth-804d3.firebaseapp.com",
        projectId: "portfolioauth-804d3",
        storageBucket: "portfolioauth-804d3.appspot.com",
        messagingSenderId: "579864354440",
        appId: "1:579864354440:web:5eca0aaba59ec4b89e893d"
      });

    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // Пользователь вошел в систему
          setUser(user);
        } else {
          // Пользователь вышел из системы
          setUser(null);
        }
      });
  
      // Отписка от прослушивания изменений состояния авторизации
      return () => unsubscribe();
    }, []);
  
    const handleSignOut = async () => {
      try {
        await firebase.auth().signOut();
        // Успешный выход из системы
      } catch (error) {
        console.log(error);
      }
    };

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    };

    return (
        <>
            <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
                <Container>
                    <NavLink to={'/'}>
                        <Navbar.Brand>
                            <img src={logo} alt="Logo" />
                        </Navbar.Brand>
                    </NavLink>
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
                            <NavLink
                                to={"/"}
                                className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
                                onClick={() => onUpdateActiveLink('home')}
                            >
                                Главная
                            </NavLink>
                            <NavLink
                                to={"/projects"}
                                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
                                onClick={() => onUpdateActiveLink('projects')}
                            >
                                Проекты
                            </NavLink>
                            <NavLink
                                to={"/calculator"}
                                className={activeLink === 'calculator' ? 'active navbar-link' : 'navbar-link'}
                                onClick={() => onUpdateActiveLink('calculator')}
                            >
                                Калькулятор
                            </NavLink>
                            <AddProjectButton />
                            {user ? (
                                <>
                                <NavLink
                                    className={activeLink === 'calculator' ? 'active navbar-link' : 'navbar-link'}
                                    onClick={() => onUpdateActiveLink('calculator')}
                                >
                                    <button className='button_exit' onClick={handleSignOut}>Выйти</button>
                                </NavLink>
                                </>
                            ) : (
                                <>
                                <NavLink
                                    to={"/SignUp"}
                                    className={activeLink === 'SignUp' ? 'active navbar-link' : 'navbar-link'}
                                    onClick={() => onUpdateActiveLink('SignUp')}
                                >
                                    Регистрация
                                </NavLink>
                                </>
                            )}
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
    );
};

export default Header;