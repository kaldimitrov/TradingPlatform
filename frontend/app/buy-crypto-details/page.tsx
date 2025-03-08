'use client';
import Layout from "@/components/layout/Layout";
import { useState } from "react";
export default function BuyCryptoDetails() {
    const [flatTabs, setFlatTabs] = useState(1);
    const handleFlatTabs = (index: number) => {
        setFlatTabs(index);
    };
    return (
        <>

            <Layout breadcrumbTitle="Buy Crypto">
                <div>
                    <section className="buy-crypto flat-tabs">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <ul className="menu-tab">
                                        <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><h6 className="fs-16">Overview</h6></li>
                                        <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><h6 className="fs-16">Buy Crypto</h6></li>
                                        <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><h6 className="fs-16">Sell Crypto</h6></li>
                                    </ul>
                                </div>
                                <div className="col-md-9">
                                    <div className="content-tab">
                                        <div className="content-inner buy-crypto__main" style={{ display: "block" }}>
                                            <div className="top">
                                                <ul className="top-list">
                                                    <li className="done">
                                                        <h6>
                                                            <span>
                                                                <svg width={10} height={8} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1 3.99967L3.66667 6.66634L9 1.33301" stroke="white" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg> </span>Select currency
                                                        </h6>
                                                    </li>
                                                    <li className="done">
                                                        <h6>
                                                            <span>
                                                                <svg width={10} height={8} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1 3.99967L3.66667 6.66634L9 1.33301" stroke="white" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg> </span>Confirm Payment
                                                        </h6>
                                                    </li>
                                                    <li className="active">
                                                        <h6><span />Complete Payment</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="main details center">
                                                <div className="heading">
                                                    <h4>Success</h4>
                                                    <div className="icon">
                                                        <svg width={10} height={8} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 3.99967L3.66667 6.66634L9 1.33301" stroke="white" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p>
                                                    You successfully bought <span>1.356 BTC</span> through TradingPlatform!
                                                </p>
                                                <ul className="status">
                                                    <li className="top">
                                                        <p className="desc">Status</p>
                                                        <p className="text">Completed</p>
                                                    </li>
                                                    <li className="s-body">
                                                        <p className="desc">Transaction ID</p>
                                                        <p className="text">5f333124-9e4d-46fa-b2fa-04601f3d5e62</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </Layout>
        </>
    );
}