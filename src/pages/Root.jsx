import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactForm from "../components/contactForm/ContactForm";
import { useTheme } from "../hooks/use-theme";

const Root = () => {

    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className="layout">
                <header>
                    <Header />
                </header>

                <main>
                    <Outlet />
                </main>

                <ContactForm />

                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default Root;