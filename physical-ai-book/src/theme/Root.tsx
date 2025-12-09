import React from 'react';
import { AuthProvider } from '@site/src/components/AuthContext';
import AuthWidget from '@site/src/components/AuthWidget';
import ChatWidget from '@site/src/components/ChatWidget';

// Fixed position auth widget wrapper
function AuthWidgetWrapper() {
    return (
        <div style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 1000,
        }}>
            <AuthWidget />
        </div>
    );
}

export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AuthWidgetWrapper />
            {children}
            <ChatWidget />
        </AuthProvider>
    );
}
