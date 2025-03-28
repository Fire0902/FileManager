import { useState, FormEvent, useCallback } from "react";
import LoginLayout from "../layout/LoginLayout";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";

function useLogin(){
    const [login, setLogin] = useState('');
    const [visiblePassword, setVisiblePassword] = useState('');
    const nav = useNavigate();
    const {request} = useRequest();

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(login, visiblePassword);
        const tab = await request('/api/login/connect', {login, visiblePassword});
        console.log(tab);
        if(tab.status = 200){
            nav('/home');
        }
    }, [login, visiblePassword, request]);


    return {login, setLogin, visiblePassword, setVisiblePassword, handleSubmit};
}

function Login(){

    const {login, setLogin, visiblePassword, setVisiblePassword, handleSubmit} = useLogin();
    return(
        <form onSubmit={handleSubmit}>
            <LoginLayout login={login} setLogin={setLogin} visiblePassword={visiblePassword} setVisiblePassword={setVisiblePassword} />
        </form>
    );
}
export default Login;