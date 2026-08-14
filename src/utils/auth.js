/**
 * Authentication Utility Module
 * Handles token storage (Cookies), retrieval, and decoding.
 */

const TOKEN_KEY = 'auth_token';

/**
 * Stores the JWT token in a cookie.
 * @param {string} token - The JWT token to store.
 * @param {number} days - Number of days until expiration (default: 7).
 */
export const setAuthToken = (token, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Strict`;
};

/**
 * Retrieves the JWT token from cookies.
 * @returns {string|null} The token or null if not found.
 */
export const getAuthToken = () => {
    const parts = document.cookie.split(`; ${TOKEN_KEY}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());

    // Check if it's the first cookie
    if (document.cookie.startsWith(`${TOKEN_KEY}=`)) {
        return decodeURIComponent(document.cookie.split('=')[1].split(';')[0]);
    }

    return null;
};

/**
 * Removes the JWT token from cookies (Logout).
 */
export const removeAuthToken = () => {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
};

/**
 * Decodes the JWT token to extract the payload (e.g., role).
 * @param {string} token - The JWT token.
 * @returns {object|null} The decoded payload or null if invalid.
 */
export const decodeToken = (token) => {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

/**
 * Helper to get the current user's role from the stored token.
 * @returns {string|null} The role or null.
 */
export const getUserRole = () => {
    const token = getAuthToken();
    const payload = decodeToken(token);
    return payload ? payload.role : null;
};
