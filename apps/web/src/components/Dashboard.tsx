import React from 'react';
import DataVisualizer3D from './DataVisualizer3D';

const Dashboard = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>

            {/* 3D Background */}
            <DataVisualizer3D />

            {/* UI Overlay */}
            <div className="ui-overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Allow clicks to pass through to 3D canvas
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem'
            }}>

                {/* Header */}
                <header style={{
                    pointerEvents: 'auto',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '1rem 2rem',
                    borderRadius: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                }}>
                    <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-primary)' }}>3D Insights</h1>
                    <nav>
                        <button style={{ marginRight: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Overview</button>
                        <button style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>Analysis</button>
                    </nav>
                </header>

                {/* Insight Card */}
                <div style={{
                    pointerEvents: 'auto',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    padding: '2rem',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Daily Summary</h2>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#555' }}>
                        Your data metrics are showing a <strong>positive trend</strong> today.
                        Interaction levels have increased by <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>24%</span> compared to last week.
                    </p>
                    <button style={{
                        marginTop: '1.5rem',
                        padding: '0.8rem 1.5rem',
                        background: 'var(--color-primary)',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'transform 0.2s',
                        width: '100%'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        View Detailed Report
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
