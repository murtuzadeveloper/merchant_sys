"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await apiRequest('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            // Redirect to login on success
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
<div className="container" style={{ 
    display: 'flex', 
    flexDirection: 'column', // Stack heading and card vertically
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    padding: '20px' 
}}>
    {/* Developer Heading */}
    <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        fontSize: '0.9rem', 
        color: '#666',
        lineHeight: '1.5'
    }}>
        <p style={{ margin: 0 }}>All Rights Reserved | Developed by <strong>murtuzadeveloper@gmail.com</strong></p>
        <p style={{ margin: 0 }}>Contact: <strong>+923060824762</strong></p>
    </div>

    <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>Merchant Register</h1>
        
        {error && <div style={{ color: 'var(--error)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            
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
                    minLength={6}
                />
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Registering...' : 'Sign Up'}
            </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem' }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--primary)' }}>Sign In</Link>
        </div>
    </div>
</div>
    );
}
