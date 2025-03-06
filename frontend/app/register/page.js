'use client';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function Register() {
    return (
        <>
            <Layout breadcrumbTitle="Register">
                <div>
                    <section className="register">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="block-text center">
                                        <h3 className="heading">Register To TradingPlatform</h3>
                                        <p className="desc fs-20">
                                            Get Started! Register now to start trading
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="flat-tabs">
                                        <div className="content-tab">
                                            <div className="content-inner" style={{ display: `block` }}>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email</label>
                                                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="example@gmail.com" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Names</label>
                                                        <div>
                                                            <input type="text" className="form-control" placeholder="John" style={{ marginRight: "8px" }} />
                                                            <input type="text" className="form-control" placeholder="Smith" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-4" style={{ marginBottom: "8px" }} >
                                                        <label>Password</label>
                                                        <input type="password" className="form-control" placeholder="Password" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control" placeholder="Confirm Password" />
                                                    </div>
                                                    <button type="submit" className="btn-action">
                                                        Register
                                                    </button>
                                                    <div className="bottom">
                                                        <p>Already have an account?</p>
                                                        <Link href="/login">Login</Link>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </div >
            </Layout >
        </>
    );
}