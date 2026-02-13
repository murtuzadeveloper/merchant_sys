"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            login(data.accessToken);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
<div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    {/* Top Heading Added Below */}
    <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>
        <p style={{ margin: 0 }}>All Rights Reserved | Developed by <strong>murtuzadeveloper@gmail.com</strong></p>
        <p style={{ margin: '4px 0 0 0' }}>Contact: +923060824762</p>
    </div>

    <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>Merchant Login</h1>
        {error && <div style={{ color: 'var(--error)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Sign In
            </button>
        </form>
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
            Don't have an account? <Link href="/register" style={{ color: 'var(--primary)' }}>Register</Link>
        </div>
    </div>
</div>
    );
}
