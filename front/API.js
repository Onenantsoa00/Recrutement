export const axiosConfig = () => {
    const auth_token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Content-Type': 'application/json'
        }
    }
}
