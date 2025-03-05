'use client';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function Login() {
    return (
        <>

            <Layout>
                <div>
                    <section className="register login">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="block-text center">
                                        <h3 className="heading">Login To TradingPlatform</h3>
                                        <p className="desc fs-20">
                                            Welcome back! Log In now to start trading
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="flat-tabs">
                                        <div className="content-tab">
                                            <div className="content-inner" style={{ display: 'block' }}>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="email" className="form-control" id="email" placeholder="example@gmail.com" />
                                                    </div>
                                                    <div className="form-group s1">
                                                        <label>Password </label>
                                                        <input type="password" className="form-control" placeholder="Please enter a password." />
                                                    </div>
                                                    <div className="form-group form-check">
                                                        <div>
                                                            <input type="checkbox" className="form-check-input" />
                                                            <label className="form-check-label">Remember Me</label>
                                                        </div>
                                                        {/* <p>Forgot Password?</p> */}
                                                    </div>
                                                    <button type="submit" className="btn-action">Login</button>
                                                    <div className="bottom">
                                                        <p>Not a member?</p>
                                                        <Link href="/register">Register</Link>
                                                    </div>
                                                </form>
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