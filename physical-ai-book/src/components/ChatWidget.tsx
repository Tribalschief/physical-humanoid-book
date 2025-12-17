import { getApiUrl } from '../config';

// ... inside component
const response = await fetch(`${getApiUrl()}/api/chat`, {

    interface Message {
    sender: 'user' | 'bot';
    text: string;
    sources?: string[];
}

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedText, setSelectedText] = useState<string | null>(null);

    // Listen for text selection
    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            const text = selection?.toString().trim();
            if (text && text.length > 10 && text.length < 2000) {
                setSelectedText(text);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (contextText?: string) => {
        const messageText = input.trim();
        if (!messageText) return;

        const displayMessage = contextText
            ? `📝 [About selected text]: ${messageText}`
            : messageText;

        setMessages(prev => [...prev, { sender: 'user', text: displayMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`${getApiUrl()}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    context_text: contextText || null
                })
            });
            const data = await response.json();
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: data.response,
                sources: data.sources
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: 'Error connecting to AI Agent. Make sure the backend is running on localhost:8000.'
            }]);
        } finally {
            setLoading(false);
            setSelectedText(null);
        }
    };

    const askAboutSelection = () => {
        if (selectedText && input.trim()) {
            sendMessage(selectedText);
        }
    };

    const clearSelection = () => setSelectedText(null);

    const styles = {
        container: {
            position: 'fixed' as const,
            bottom: '20px',
            right: '20px',
            zIndex: 9998,
            fontFamily: "'Inter', sans-serif",
        },
        chatButton: {
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '16px 24px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
        },
        chatWindow: {
            width: '400px',
            height: '550px',
            background: '#0f1219',
            borderRadius: '20px',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column' as const,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        header: {
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerTitle: {
            margin: 0,
            fontSize: '16px',
            fontWeight: 600,
            color: 'white',
        },
        closeButton: {
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        messagesContainer: {
            flex: 1,
            overflowY: 'auto' as const,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '12px',
        },
        welcomeMessage: {
            textAlign: 'center' as const,
            color: '#94a3b8',
            fontSize: '14px',
            padding: '20px',
        },
        userMessage: {
            alignSelf: 'flex-end' as const,
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '16px 16px 4px 16px',
            maxWidth: '80%',
            fontSize: '14px',
            lineHeight: '1.5',
        },
        botMessage: {
            alignSelf: 'flex-start' as const,
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#e2e8f0',
            padding: '12px 16px',
            borderRadius: '16px 16px 16px 4px',
            maxWidth: '85%',
            fontSize: '14px',
            lineHeight: '1.6',
            border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        sources: {
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '11px',
            color: '#64748b',
        },
        loadingDots: {
            display: 'flex',
            gap: '4px',
            padding: '12px 16px',
        },
        selectionBanner: {
            background: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '10px 12px',
            margin: '0 12px 8px',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#93c5fd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        inputContainer: {
            padding: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            gap: '8px',
        },
        input: {
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
        },
        sendButton: {
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
        },
        askSelectionButton: {
            background: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            color: 'white',
            fontSize: '12px',
            cursor: 'pointer',
            fontWeight: 500,
        },
    };

    return (
        <div style={styles.container}>
            {!isOpen && (
                <button
                    style={styles.chatButton}
                    onClick={toggleChat}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <span style={{ fontSize: '20px' }}>🤖</span>
                    Ask AI Tutor
                </button>
            )}

            {isOpen && (
                <div style={styles.chatWindow}>
                    <div style={styles.header}>
                        <h4 style={styles.headerTitle}>📚 Physical AI Assistant</h4>
                        <button style={styles.closeButton} onClick={toggleChat}>×</button>
                    </div>

                    <div style={styles.messagesContainer}>
                        {messages.length === 0 && (
                            <div style={styles.welcomeMessage}>
                                <p style={{ fontSize: '24px', marginBottom: '8px' }}>👋</p>
                                <p>Hi! I'm your AI tutor for Physical AI & Robotics.</p>
                                <p style={{ marginTop: '8px', fontSize: '12px' }}>
                                    Tip: Select text on the page, then ask me about it!
                                </p>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={m.sender === 'user' ? styles.userMessage : styles.botMessage}
                            >
                                <div>{m.text}</div>
                                {m.sources && m.sources.length > 0 && (
                                    <div style={styles.sources}>
                                        📖 Sources: {m.sources.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div style={styles.botMessage}>
                                <div style={styles.loadingDots}>
                                    <span>⏳ Thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedText && (
                        <div style={styles.selectionBanner}>
                            <span>📝 Text selected ({selectedText.length} chars)</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    style={styles.askSelectionButton}
                                    onClick={askAboutSelection}
                                    disabled={!input.trim()}
                                >
                                    Ask about this
                                </button>
                                <button
                                    onClick={clearSelection}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#94a3b8',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    <div style={styles.inputContainer}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    if (selectedText) {
                                        askAboutSelection();
                                    } else {
                                        sendMessage();
                                    }
                                }
                            }}
                            placeholder={selectedText ? "Ask about selected text..." : "Ask about ROS 2, URDF, Isaac Sim..."}
                            style={styles.input}
                        />
                        <button
                            onClick={() => selectedText ? askAboutSelection() : sendMessage()}
                            style={styles.sendButton}
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
