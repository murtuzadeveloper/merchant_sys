"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import TransactionList from '@/components/TransactionList';
import CreateTransaction from '@/components/CreateTransaction';

export default function DashboardPage() {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        // Small delay to allow AuthContext to initialize from localStorage
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    if (loading) {
        return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
<div className="container" style={{ padding: '20px 20px 40px 20px' }}>
    {/* Developer Attribution Header */}
    <div style={{
        textAlign: 'center',
        padding: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        fontSize: '0.85rem',
        color: '#666'
    }}>
        <p style={{ margin: 0 }}>
            © All Rights Reserved | Developed by <strong>murtuzadeveloper@gmail.com</strong>
        </p>
        <p style={{ margin: '4px 0 0 0' }}>
            Contact: <strong>+923060824762</strong>
        </p>
    </div>

    <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
    }}>
        <h1 style={{ margin: 0 }}>Merchant Dashboard</h1>
        <button
            onClick={logout}
            style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                width: '40%',
                transition: 'background-color 0.2s'
            }}
        >
            Sign Out
        </button>
    </header>

    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr)', gap: '24px' }}>
        <CreateTransaction onTransactionCreated={() => setRefreshTrigger(prev => prev + 1)} />
        <TransactionList refreshTrigger={refreshTrigger} />
    </div>
</div>
    );
}
