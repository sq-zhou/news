
export const login = user => ({
    type: 'login',
    payload: user,
});

export const logout = () => ({
    type: 'logout',
});
