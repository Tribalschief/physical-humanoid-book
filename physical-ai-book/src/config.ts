export const getApiUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:8000';
    }
    return 'https://determined-adaptation-production.up.railway.app';
};

export const getAuthUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:4000';
    }
    return 'https://physical-humanoid-book-production.up.railway.app';
};
