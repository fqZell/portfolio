import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContactForm } from "../components/contactForm/ContactForm";

const Root = () => {

    return (
        <>
            <div className="layout">
                <header>
                    <Header />
                </header>

                <main>
                    <Outlet />
                    {/* <ContactForm /> */}
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default Root;