"use client";

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';

interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
}

interface TransactionListProps {
    refreshTrigger: number;
}

export default function TransactionList({ refreshTrigger }: TransactionListProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const data = await apiRequest(`/transactions?page=${page}&limit=10`);
            setTransactions(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Failed to fetch transactions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [page, refreshTrigger]);

    return (
        <div className="card">
            <h2 style={{ marginBottom: '16px' }}>Transactions</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px' }}>ID</th>
                            <th style={{ padding: '12px' }}>Amount</th>
                            <th style={{ padding: '12px' }}>Currency</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center' }}>Loading...</td></tr>
                        ) : transactions.length === 0 ? (
                            <tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center' }}>No transactions found.</td></tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px', fontSize: '0.9rem', color: '#94a3b8' }}>{tx.id.slice(0, 8)}...</td>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{tx.amount}</td>
                                    <td style={{ padding: '12px' }}>{tx.currency}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            backgroundColor: tx.status === 'SUCCESS' ? 'rgba(16, 185, 129, 0.2)' : tx.status === 'PENDING' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                            color: tx.status === 'SUCCESS' ? '#10b981' : tx.status === 'PENDING' ? '#fbbf24' : '#ef4444',
                                        }}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '0.9rem' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button
                    className="btn"
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    style={{ opacity: page === 1 ? 0.5 : 1 }}
                >
                    Previous
                </button>
                <span style={{ display: 'flex', alignItems: 'center' }}>Page {page} of {totalPages}</span>
                <button
                    className="btn"
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                    style={{ opacity: page >= totalPages ? 0.5 : 1 }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
