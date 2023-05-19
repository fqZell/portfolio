import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {

    return (
        <>
            <div className="layout">
                <header>
                    <Header />
                </header>

                <main>
                    <Outlet />
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default Root;