"use client";

import { useState } from 'react';
import { apiRequest } from '@/lib/api';

interface CreateTransactionProps {
    onTransactionCreated: () => void;
}

export default function CreateTransaction({ onTransactionCreated }: CreateTransactionProps) {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await apiRequest('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    currency,
                }),
            });
            setAmount('');
            onTransactionCreated();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ marginBottom: '24px' }}>
            <h2 style={{ marginBottom: '16px' }}>Create Transaction</h2>
            {error && <div style={{ color: 'var(--error)', marginBottom: '16px' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        placeholder="0.00"
                    />
                </div>
                <div style={{ width: '120px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Currency</label>
                    <select
                        className="input"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        style={{ cursor: 'pointer' }}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="KWD">KWD</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ height: '45px', minWidth: '100px' }}
                >
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    );
}
