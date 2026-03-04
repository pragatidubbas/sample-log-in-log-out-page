import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/profile');
                setUser(res.data);
            } catch (err) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return <div className="text-center">Loading...</div>;

    return (
        <div className="glass-card" style={{ maxWidth: '600px' }}>
            <h1>Dashboard</h1>
            <p className="subtitle">Secure area</p>

            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Hello, {user.name}</h2>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {user.email}</p>
                    <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
            </div>

            <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                Sign Out
            </button>
        </div>
    );
};

export default Dashboard;
