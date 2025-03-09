'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import axios from 'axios';
import { toast } from 'react-toastify';
import { login } from '@/services/requests/user-requests';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            if (response.status === 200) {
                window.location.href = '/wallet';
            } else {
                toast.error('Invalid email or password. Please try again.');
            }
        } catch (error) {
            toast.error('Invalid email or password. Please try again.');
        }
    };

    return (
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
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="example@gmail.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group s1">
                                                    <label>Password </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group form-check">
                                                    <div>
                                                        <input type="checkbox" className="form-check-input" />
                                                        <label className="form-check-label">Remember Me</label>
                                                    </div>
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
    );
}