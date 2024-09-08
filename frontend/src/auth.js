import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    getAccessToken: (session) => session.accessToken,  // Get the access token from the session object
    storage: localStorage,  // Store the token in localStorage
    onUpdateToken: (token) => 
        fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh_token: token.refreshToken })  // Send the refresh token
        }).then((r) => r.json()),  // Parse response as JSON
});
