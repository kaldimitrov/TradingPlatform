import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__main">
                        <div className="row">
                            <div className="col-xl-4 col-md-8">
                                <div className="info">
                                    <Link href="/" className="logo">
                                        <img src="/assets/images/logo/favicon.png" alt="" />
                                    </Link>
                                    <h6>Contacts</h6>
                                    <ul className="list">
                                        <li>
                                            <p>+359 00 000 0000</p>
                                        </li>
                                        <li>
                                            <p>kaloyan.s.dimitrov@gmail.com</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-8 col-md-12">
                                <div className="row justify-content-end">
                                    <div className="col-xl-3 col-md-4">
                                        <div className="widget-link s2">
                                            <h6 className="title">SERVICES</h6>
                                            <ul>
                                                <li><Link href="/buy-crypto-select">Buy Crypto</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-4">
                                        <div className="widget-link s4">
                                            <h6 className="title">ABOUT US</h6>
                                            <ul>
                                                <li><Link href="https://www.linkedin.com/in/kaloyan-s-dimitrov/">LinkedIn</Link></li>
                                                <li><Link href="https://github.com/kaldimitrov/TradingPlatform">Github</Link></li>
                                                <li><Link href="/">Home</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
