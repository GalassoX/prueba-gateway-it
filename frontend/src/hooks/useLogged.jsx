import { useNavigate } from "react-router-dom";

const useLogged = () => {
    const key = 'apptoken';
    const navigate = useNavigate();

    const token = window.localStorage.getItem(key);
    return {
        isLogged: !!token,
        token,
        logout: () => {
            window.localStorage.removeItem(key);
            navigate('/');

        },
        setToken: (token) => {
            window.localStorage.setItem(key, token);
        }
    }
}

export default useLogged;