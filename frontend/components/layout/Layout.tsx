
'use client';
import { useState } from "react";
import AddClassBody from "../elements/AddClassBody";
import Breadcrumb from './Breadcrumb';
import Footer from './footer/Footer';
import Header from "./header/Header";
import { ToastContainer } from "react-toastify";

export default function Layout({ breadcrumbTitle, children }: { breadcrumbTitle?: string, children?: any }) {
    const [isMobileMenu, setMobileMenu] = useState(false);
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu);

    return (
        <><div id="top" />
            <AddClassBody />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <Header isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
            {children}
            < Footer />
        </>
    );
}
