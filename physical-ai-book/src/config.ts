export const getApiUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:8000';
    }
    // TODO: Replace these with your actual deployed URLs after deploying to Render/Vercel
    return 'https://hackathon-backend.onrender.com';
};

export const getAuthUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:4000';
    }
    // TODO: Replace these with your actual deployed URLs after deploying to Render/Vercel
    return 'https://hackathon-auth.onrender.com';
};
