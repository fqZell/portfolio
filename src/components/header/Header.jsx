import React from 'react';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../../assets/img/logo/logo.svg";
import { useTheme } from "../../hooks/use-theme";
import { faMoon, faSun, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import { getAuth, signOut } from "firebase/auth";
// import { app } from "../auth/firebase";
import Auth from '../auth/Auth';
const API_KEY = import.meta.env.VITE_API_KEY; 
import firebase from 'firebase/compat/app';

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
    // const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const { theme, setTheme } = useTheme();
    // const auth = getAuth(app);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    // const handleLogout = () => {
    //     signOut(auth)
    //         .then(() => {
    //             setIsUserAuthenticated(false);
    //             console.log("User signed out successfully.");
    //         })
    //         .catch((error) => {
    //             console.error("Error signing out:", error);
    //         });
    // };

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         setIsUserAuthenticated(!!user);
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [auth]);

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
                            {/* {isUserAuthenticated ? (
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </button>
                            ) : (
                                <Auth />
                            )} */}
                            <Auth />
                        </span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;