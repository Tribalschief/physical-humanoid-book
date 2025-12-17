import React, { useState } from 'react';
import { getApiUrl } from '../config';

const TranslateButton = () => {
    const [translated, setTranslated] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleTranslate = async () => {
        setLoading(true);
        // Better selector for Docusaurus content
        const contentEl = document.querySelector('.markdown') || document.querySelector('article');
        const contentText = contentEl?.innerText || "No content found. Please navigate to a chapter.";

        try {
            const res = await fetch(`${getApiUrl()}/api/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: contentText.substring(0, 800) })
            });
            const data = await res.json();

            if (data.translated_text && !data.translated_text.includes("Translation failed") && !data.translated_text.includes("[Error]")) {
                setTranslated(data.translated_text);
                setIsOpen(true);
            } else {
                setTranslated(data.translated_text || "Translation service temporarily unavailable.");
                setIsOpen(true);
            }

        } catch (e: any) {
            console.error(e);
            setTranslated(`Error: Could not connect to Translation Agent. Make sure the backend is running on localhost:8000.`);
            setIsOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Floating Translate Button */}
            <button
                onClick={handleTranslate}
                disabled={loading}
                style={{
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '50px',
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
                onMouseOver={(e) => {
                    if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.5)';
                    }
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.4)';
                }}
            >
                🌐 {loading ? "Translating..." : "اردو میں ترجمہ"}
            </button>

            {/* Translation Panel */}
            {isOpen && translated && (
                <div style={{
                    position: 'fixed',
                    bottom: '160px',
                    right: '20px',
                    width: '350px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    background: 'rgba(20, 20, 30, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    padding: '20px',
                    zIndex: 1000
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#ec4899'
                        }}>
                            اردو ترجمہ
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '12px'
                            }}
                        >
                            ✕ Close
                        </button>
                    </div>
                    <div style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        fontFamily: '"Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", serif',
                        direction: 'rtl',
                        textAlign: 'right',
                        color: '#e2e8f0'
                    }}>
                        {translated}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranslateButton;
