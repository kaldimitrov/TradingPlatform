'use client';
import Layout from "@/components/layout/Layout";
export default function UserProfile() {
    return (
        <>

            <Layout breadcrumbTitle="User Profile">
                <div>
                    <section className="user-profile flat-tabs">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-3 col-md-12">
                                    <div className="user-info center">
                                        <div className="avt">
                                            <input type="file" className="custom-file-input" id="imgInp" required />
                                            <img id="blah" src="/assets/images/avatar.png" alt="no file" />
                                        </div>
                                        <h6 className="name">Peterson kennady</h6>
                                        <p>petersonkenn@demo.com</p>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-md-12">
                                    <div className="content-tab">
                                        <div className="content-inner profile" style={{ display: 'block' }}>
                                            <form >
                                                <h4>User Profile</h4>
                                                <h6>Infomation</h6>
                                                <div className="form-group d-flex s1">
                                                    <input type="text" className="form-control" defaultValue="John" placeholder="First Name" />
                                                    <input type="text" className="form-control" defaultValue="Smith" placeholder="Last Name" />
                                                </div>
                                                <div className="form-group d-flex">
                                                    <input type="email" className="form-control" id="exampleInputEmail1" defaultValue="Tonynguyen@demo.com" placeholder="Email" />
                                                </div>
                                                <h6 className="two">Features</h6>
                                                <div className="bt d-flex">
                                                    <div className="left">
                                                        <h6>Free Tier</h6>
                                                        <ul>
                                                            <li>
                                                                <p>Deposit assets</p>
                                                                <input type="checkbox" className="check-box__switcher" defaultChecked />
                                                            </li>
                                                            <li>
                                                                <p>Withdraw assets</p>
                                                                <p className="text">Enabled $1,000,000/day</p>
                                                            </li>
                                                            <li>
                                                                <p>Card purchases</p>
                                                                <input type="checkbox" className="check-box__switcher" />
                                                            </li>
                                                            <li>
                                                                <p>Bank deposit</p>
                                                                <input type="checkbox" className="check-box__switcher" />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="right">
                                                        <h6>Premium Tier</h6>
                                                        <ul>
                                                            <li>
                                                                <p>Fiat and Spot wallet</p>
                                                                <input type="checkbox" className="check-box__switcher" defaultChecked />
                                                            </li>
                                                            <li>
                                                                <p>Margin wallet</p>
                                                                <p className="text">Enabled 100x Leverage</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn-action">
                                                    Update Profile
                                                </button>
                                            </form>
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