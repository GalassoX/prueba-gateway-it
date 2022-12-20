import { useEffect } from 'react'
import useLogged from '../hooks/useLogged';

const Logout = () => {
    const { logout } = useLogged();

    useEffect(() => {
        logout();
    }, [])

    return null;
}

export default Logout;