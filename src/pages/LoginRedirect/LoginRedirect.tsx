import React from 'react';
import './LoginRedirect.css';
import {useStoreActions} from "../../store/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {loginUsingToken} from "../../adapters/AuthAdapter";

interface LoginRedirectProps {

}

const LoginRedirect: React.FC<LoginRedirectProps> = () => {

    // Objects
    const navigate = useNavigate();

    // Variables
    const {setDataFetched, setUser, setToken} = useStoreActions(actions => actions.userStore)
    const [searchParams, ] = useSearchParams();
    // State Variables - Hooks

    // Functions

    // Hook Functions
    React.useEffect(() => {
        const token = searchParams.get("token");
        console.log(token)
        if (token) {
            setToken(token);
            loginUsingToken(token).then((response) => {
                setDataFetched(true);
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", response.refreshToken)
                setUser(response);
                navigate('/site-management')
            }).catch(() => {
                navigate('/login')
            })
        } else {
            navigate('/login')
        }
    }, [navigate, searchParams, setDataFetched, setToken, setUser]);


    return (
        <></>
    )
};

export default LoginRedirect;