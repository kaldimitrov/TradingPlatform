import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import MainMenu from '../Menu';
import MobileMenu from '../MobileMenu';
const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
    ssr: false,
});
export default function Header({ isMobileMenu, handleMobileMenu }) {
    return (
        <>

            <header id="header_main" className={`header`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="header__body d-flex justify-content-between">
                                <div className="header__left">
                                    <div className="logo">
                                        <Link className="light" href="/">
                                            <img src="/assets/images/logo/logo.png" alt="" width={118} height={32} data-retina="assets/images/logo/logo@2x.png" data-width={118} data-height={32} />
                                        </Link>
                                        <Link className="dark" href="/">
                                            <img src="/assets/images/logo/logo-dark.png" alt="" width={118} height={32} data-retina="assets/images/logo/logo-dark@2x.png" data-width={118} data-height={32} />
                                        </Link>
                                    </div>
                                    <div className="left__main">
                                        <div className="d-none d-lg-block">
                                            <nav id="main-nav" className="main-nav">
                                                <MainMenu />
                                            </nav>
                                            {/* #main-nav */}
                                        </div>
                                    </div>
                                </div>
                                <div className="header__right">
                                    <ThemeSwitch />
                                    <div className="d-block d-lg-none">
                                        <div className={`mobile-button d-block ${isMobileMenu ? "active" : ""}`} onClick={handleMobileMenu}><span /></div>{/* /.mobile-button */}
                                    </div>
                                    <div className="wallet">
                                        <Link href="/wallet"> Reset </Link>
                                    </div>
                                    <Menu as="div" className="dropdown user">
                                        <Menu.Button className="btn dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src="/assets/images/avatar.png" alt="" />
                                        </Menu.Button>
                                        <Menu.Items as="div" className="dropdown-menu show" aria-labelledby="dropdownMenuButton4">
                                            <Link className="dropdown-item" href="/user-profile"><i className="bx bx-user font-size-16 align-middle me-1" />
                                                <span>Profile</span></Link>
                                            <div className="dropdown-divider" />
                                            <Link className="dropdown-item text-danger" href="/login"><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                                                <span>Logout</span></Link>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MobileMenu isMobileMenu={isMobileMenu} />
            </header>

        </>
    );
}
