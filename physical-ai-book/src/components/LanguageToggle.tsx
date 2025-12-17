import React, { useState, useEffect, useCallback } from 'react';
import { getApiUrl } from '../config';

interface LanguageToggleProps {
    // Optional: pass the content container selector
    contentSelector?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
    contentSelector = '.markdown, article'
}) => {
    const [isUrdu, setIsUrdu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [originalContent, setOriginalContent] = useState<string | null>(null);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Store original content on mount
    useEffect(() => {
        const contentEl = document.querySelector(contentSelector);
        if (contentEl && !originalContent) {
            setOriginalContent(contentEl.innerHTML);
        }
    }, [contentSelector, originalContent]);

    const translateContent = useCallback(async () => {
        const contentEl = document.querySelector(contentSelector);
        if (!contentEl) return;

        setLoading(true);
        setError(null);

        // Get text content for translation (limit to reasonable size)
        const textContent = contentEl.textContent || '';
        const truncatedText = textContent.substring(0, 2000);

        try {
            const res = await fetch(`${getApiUrl()}/api/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: truncatedText })
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            if (data.translated_text && !data.translated_text.includes("[Error]")) {
                setTranslatedContent(data.translated_text);
                return data.translated_text;
            } else {
                throw new Error(data.translated_text || 'Translation failed');
            }
        } catch (e: any) {
            console.error('Translation error:', e);
            setError(e.message || 'Could not connect to translation service');
            return null;
        } finally {
            setLoading(false);
        }
    }, [contentSelector]);

    const handleToggle = async () => {
        const contentEl = document.querySelector(contentSelector);
        if (!contentEl) return;

        if (!isUrdu) {
            // Switch to Urdu
            if (!translatedContent) {
                const translation = await translateContent();
                if (translation) {
                    // Replace content with Urdu translation
                    contentEl.innerHTML = `
                        <div style="direction: rtl; text-align: right; font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; line-height: 2.2; font-size: 1.1rem;">
                            <div style="white-space: pre-wrap;">${translation}</div>
                        </div>
                    `;
                    setIsUrdu(true);
                }
            } else {
                // Use cached translation
                contentEl.innerHTML = `
                    <div style="direction: rtl; text-align: right; font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; line-height: 2.2; font-size: 1.1rem;">
                        <div style="white-space: pre-wrap;">${translatedContent}</div>
                    </div>
                `;
                setIsUrdu(true);
            }
        } else {
            // Switch back to English
            if (originalContent) {
                contentEl.innerHTML = originalContent;
            }
            setIsUrdu(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
        }}>
            {/* Error message */}
            {error && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    maxWidth: '250px'
                }}>
                    {error}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                disabled={loading}
                style={{
                    background: isUrdu
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    color: 'white',
                    border: 'none',
                    padding: '14px 24px',
                    borderRadius: '50px',
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: isUrdu
                        ? '0 4px 15px rgba(16, 185, 129, 0.4)'
                        : '0 4px 15px rgba(236, 72, 153, 0.4)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    minWidth: '160px',
                    justifyContent: 'center'
                }}
                onMouseOver={(e) => {
                    if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    }
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
            >
                {loading ? (
                    <>
                        <span style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid white',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        Translating...
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '18px' }}>🌐</span>
                        {isUrdu ? 'English' : 'اردو'}
                    </>
                )}
            </button>

            {/* Add keyframes for spinner */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LanguageToggle;
