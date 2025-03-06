'use client';
import Link from "next/link";

export default function Banner() {
    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="banner__content">
                                <h2 className="title">Buy &amp; Sell Virtual Digital Assets</h2>
                                <p className="fs-20 desc">
                                    TradingPlatform is the easiest, safest, and fastest way to buy &amp;
                                    sell crypto asset exchange.
                                </p>
                                <Link href="#" className="btn-action"><span>Get started now</span></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="banner__image">
                                <img src="/assets/images/layout/banner-01.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
