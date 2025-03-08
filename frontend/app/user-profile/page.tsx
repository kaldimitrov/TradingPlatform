'use client';
import Layout from "@/components/layout/Layout";
import { ToastMessages } from "@/enums/toast-messages.enum";
import { Account } from "@/models/account.model";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function UserProfile() {
    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                // todo connect to the backend
                const response = await fetch('/api/account');
                const data: Account = await response.json();
                setAccount(data);
            } catch (error) {
                if (toast.isActive(ToastMessages.ERROR_FETCHING_ACCOUNT)) {
                    return;
                }
                toast.error(ToastMessages.ERROR_FETCHING_ACCOUNT, { toastId: ToastMessages.ERROR_FETCHING_ACCOUNT });
            }
        };

        fetchAccount();
    }, []);

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
                                            <img id="avatar" src="/assets/images/avatar.png" alt="no file" />
                                        </div>
                                        <h6 className="name">{account?.firstName} {account?.lastName}</h6>
                                        <p>{account?.email}</p>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-md-12">
                                    <div className="content-tab">
                                        <div className="content-inner profile" style={{ display: 'block' }}>
                                            <form >
                                                <h4>User Profile</h4>
                                                <h6>Information</h6>
                                                <div className="form-group d-flex s1">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={account?.firstName || ''}
                                                        placeholder="First Name"
                                                        readOnly
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={account?.lastName || ''}
                                                        placeholder="Last Name"
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group d-flex">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={account?.email || ''}
                                                        placeholder="Email"
                                                        readOnly
                                                    />
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