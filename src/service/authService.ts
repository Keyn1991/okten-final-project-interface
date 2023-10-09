import axiosService from "./axiosService";


const login = async (email: string, password: string) => {
    return await axiosService.post('/login', { email, password });
};

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
};

export const logout = () => {
    localStorage.removeItem('access_token');
};

export {login};
