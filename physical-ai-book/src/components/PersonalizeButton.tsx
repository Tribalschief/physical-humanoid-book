import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const PersonalizeButton = () => {
    const { user } = useAuth();
    const [personalizedText, setPersonalizedText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handlePersonalize = async () => {
        setLoading(true);

        // Get the current page content
        const contentEl = document.querySelector('.markdown') || document.querySelector('article');
        const content = contentEl?.textContent?.substring(0, 500) || "";

        // Determine user background for personalization
        let background = "beginner";
        if (user) {
            background = user.experienceLevel || "beginner";
            // Add more context if user has detailed background
            if (user.softwareBackground || user.hardwareBackground) {
                background = `${user.experienceLevel}. Software: ${user.softwareBackground}. Hardware: ${user.hardwareBackground}`;
            }
        }

        try {
            const res = await fetch('http://localhost:8000/api/personalize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: content,
                    user_background: background
                })
            });
            const data = await res.json();
            if (data.status === 'error') {
                setPersonalizedText(data.personalized_text || "Personalization unavailable");
            } else {
                setPersonalizedText(data.personalized_text);
            }
            setIsOpen(true);
        } catch (e) {
            setPersonalizedText("Error: Could not connect to AI Agent. Ensure backend is running on localhost:8000.");
            setIsOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'inline-block', marginRight: '8px', marginBottom: '16px' }}>
            <button
                onClick={handlePersonalize}
                disabled={loading}
                style={{
                    background: user
                        ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                        : 'linear-gradient(135deg, #6b7280, #4b5563)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '50px',
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: user
                        ? '0 4px 12px rgba(59, 130, 246, 0.4)'
                        : '0 4px 12px rgba(107, 114, 128, 0.3)',
                    transition: 'all 0.2s ease',
                }}
                title={user ? `Personalized for: ${user.experienceLevel}` : 'Sign in for personalized content'}
            >
                ✨ {loading ? "Personalizing..." : user ? "Personalize" : "Personalize (Sign in)"}
            </button>

            {isOpen && personalizedText && (
                <div style={{
                    marginTop: '16px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                    borderLeft: '4px solid #3b82f6',
                    borderRadius: '12px',
                    position: 'relative',
                }}>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        ×
                    </button>
                    <div style={{
                        fontSize: '13px',
                        color: '#3b82f6',
                        fontWeight: 600,
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        🎓 Personalized for: {user ? user.experienceLevel : 'General audience'}
                    </div>
                    <div style={{
                        fontSize: '0.95rem',
                        lineHeight: '1.7',
                        color: 'inherit'
                    }}>
                        {personalizedText}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalizeButton;
