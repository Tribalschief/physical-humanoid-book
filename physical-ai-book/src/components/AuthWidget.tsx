import React, { useState } from 'react';
import { useAuth } from './AuthContext';

type AuthMode = 'signin' | 'signup' | null;

const AuthWidget = () => {
    const { user, login, signup, logout, isLoading } = useAuth();
    const [mode, setMode] = useState<AuthMode>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [softwareBackground, setSoftwareBackground] = useState('');
    const [hardwareBackground, setHardwareBackground] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('beginner');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error || 'Sign in failed');
        } else {
            setMode(null);
            resetForm();
        }
        setLoading(false);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await signup({
            email,
            password,
            name,
            softwareBackground,
            hardwareBackground,
            experienceLevel
        });

        if (!result.success) {
            setError(result.error || 'Sign up failed');
        } else {
            setMode(null);
            resetForm();
        }
        setLoading(false);
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setSoftwareBackground('');
        setHardwareBackground('');
        setExperienceLevel('beginner');
        setError(null);
    };

    const styles = {
        container: {
            position: 'relative' as const,
            marginLeft: 'auto',
        },
        userBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '50px',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            border: 'none',
        },
        loginButton: {
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
        },
        modal: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
        },
        modalContent: {
            background: '#1a1f2e',
            borderRadius: '24px',
            padding: '32px',
            width: '100%',
            maxWidth: '450px',
            maxHeight: '90vh',
            overflowY: 'auto' as const,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
            position: 'relative' as const,
        },
        title: {
            fontSize: '24px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '8px',
            textAlign: 'center' as const,
        },
        subtitle: {
            fontSize: '14px',
            color: '#94a3b8',
            marginBottom: '24px',
            textAlign: 'center' as const,
        },
        input: {
            width: '100%',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            marginBottom: '12px',
            outline: 'none',
            boxSizing: 'border-box' as const,
        },
        select: {
            width: '100%',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            marginBottom: '12px',
            outline: 'none',
            boxSizing: 'border-box' as const,
        },
        label: {
            display: 'block',
            fontSize: '13px',
            color: '#94a3b8',
            marginBottom: '6px',
            fontWeight: 500,
        },
        textarea: {
            width: '100%',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            marginBottom: '12px',
            outline: 'none',
            resize: 'vertical' as const,
            minHeight: '80px',
            boxSizing: 'border-box' as const,
            fontFamily: 'inherit',
        },
        submitButton: {
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '8px',
        },
        error: {
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            color: '#f87171',
            fontSize: '13px',
            marginBottom: '16px',
        },
        switchText: {
            textAlign: 'center' as const,
            marginTop: '16px',
            fontSize: '14px',
            color: '#94a3b8',
        },
        switchLink: {
            color: '#ec4899',
            cursor: 'pointer',
            fontWeight: 600,
        },
        closeButton: {
            position: 'absolute' as const,
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '24px',
            cursor: 'pointer',
        },
        sectionTitle: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#ec4899',
            marginTop: '20px',
            marginBottom: '12px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '20px',
        },
        dropdown: {
            position: 'absolute' as const,
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: '#1a1f2e',
            borderRadius: '12px',
            padding: '8px',
            minWidth: '200px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            zIndex: 1001,
        },
        dropdownItem: {
            padding: '10px 12px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            textAlign: 'left' as const,
            background: 'none',
            border: 'none',
        },
    };

    if (isLoading) {
        return <div style={styles.loginButton}>Loading...</div>;
    }

    // Logged in state
    if (user) {
        return (
            <div style={styles.container}>
                <button
                    style={styles.userBadge}
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span>👤</span>
                    <span>{user.name || user.email.split('@')[0]}</span>
                </button>

                {showDropdown && (
                    <div style={styles.dropdown}>
                        <div style={{ padding: '8px 12px', color: '#94a3b8', fontSize: '12px' }}>
                            {user.email}
                        </div>
                        <div style={{ padding: '8px 12px', color: '#94a3b8', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            Level: {user.experienceLevel}
                        </div>
                        <button
                            style={styles.dropdownItem}
                            onClick={() => {
                                logout();
                                setShowDropdown(false);
                            }}
                        >
                            🚪 Sign Out
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Login/Signup buttons
    return (
        <div style={styles.container}>
            <button
                style={styles.loginButton}
                onClick={() => setMode('signin')}
            >
                Sign In
            </button>

            {mode && (
                <div style={styles.modal} onClick={() => { setMode(null); resetForm(); }}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            style={styles.closeButton}
                            onClick={() => { setMode(null); resetForm(); }}
                        >
                            ×
                        </button>

                        {mode === 'signin' ? (
                            <>
                                <h2 style={styles.title}>Welcome Back</h2>
                                <p style={styles.subtitle}>Sign in to access personalized content</p>

                                {error && <div style={styles.error}>{error}</div>}

                                <form onSubmit={handleSignIn}>
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={styles.input}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={styles.input}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        style={styles.submitButton}
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>

                                <p style={styles.switchText}>
                                    Don't have an account?{' '}
                                    <span
                                        style={styles.switchLink}
                                        onClick={() => { setMode('signup'); setError(null); }}
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 style={styles.title}>Create Account</h2>
                                <p style={styles.subtitle}>Tell us about yourself for personalized learning</p>

                                {error && <div style={styles.error}>{error}</div>}

                                <form onSubmit={handleSignUp}>
                                    <label style={styles.label}>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={styles.input}
                                        required
                                    />

                                    <label style={styles.label}>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={styles.input}
                                        required
                                    />

                                    <label style={styles.label}>Password</label>
                                    <input
                                        type="password"
                                        placeholder="Create a password (min 6 chars)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={styles.input}
                                        required
                                        minLength={6}
                                    />

                                    <div style={styles.sectionTitle}>📋 Your Background</div>

                                    <label style={styles.label}>Experience Level</label>
                                    <select
                                        value={experienceLevel}
                                        onChange={(e) => setExperienceLevel(e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value="beginner">Beginner - New to robotics</option>
                                        <option value="intermediate">Intermediate - Some experience</option>
                                        <option value="advanced">Advanced - Professional/Researcher</option>
                                    </select>

                                    <label style={styles.label}>Software Background</label>
                                    <textarea
                                        placeholder="e.g., Python, C++, ROS, Machine Learning..."
                                        value={softwareBackground}
                                        onChange={(e) => setSoftwareBackground(e.target.value)}
                                        style={styles.textarea}
                                    />

                                    <label style={styles.label}>Hardware Background</label>
                                    <textarea
                                        placeholder="e.g., Arduino, Raspberry Pi, Sensors..."
                                        value={hardwareBackground}
                                        onChange={(e) => setHardwareBackground(e.target.value)}
                                        style={styles.textarea}
                                    />

                                    <button
                                        type="submit"
                                        style={styles.submitButton}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </form>

                                <p style={styles.switchText}>
                                    Already have an account?{' '}
                                    <span
                                        style={styles.switchLink}
                                        onClick={() => { setMode('signin'); setError(null); }}
                                    >
                                        Sign In
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthWidget;
