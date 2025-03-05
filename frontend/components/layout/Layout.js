
'use client';
import { useState } from "react";
import AddClassBody from "../elements/AddClassBody";
import Breadcrumb from './Breadcrumb';
import Footer from './footer/Footer';
import Header from "./header/Header";

export default function Layout({ breadcrumbTitle, children }) {
    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false);
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu);

    return (
        <><div id="top" />
            <AddClassBody />
            <Header isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
            {children}
            < Footer />
        </>
    );
}
