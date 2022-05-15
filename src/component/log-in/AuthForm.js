import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import './AuthForm.scss'
import {ReactComponent as KeyIcon} from "../../assets/key.svg";
import {ReactComponent as UserIcon} from "../../assets/user.svg";
import httpClient from "../../api/http-client";
import AuthContext from "../store/AuthContext";

const AuthForm = () => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true);
    const [inputUsername, setInputUserName] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (e) => {
        e.preventDefault()

        const userInputValue = inputUsername;
        const passwordInputValue = inputPassword;

        setIsLoading(true)
        if (isLogin) {
            (async () => {
                try {
                    const res = httpClient.post('/login', {
                        username: userInputValue,
                        password: passwordInputValue
                    })
                    const data = await res
                    console.log(data)
                    authCtx.login(data.data.token)
                    navigate('/welcome')
                } catch (err) {
                    alert('Incorrect username or password')
                }
                setIsLoading(false)
            })()
        } else {
            (async () => {
                    try {
                        const res = httpClient.post('/signup', {
                            username: userInputValue,
                            password: passwordInputValue
                        })
                        const data = await res;
                        setIsLogin(true)
                    } catch (err) {
                        alert('Invalid username or password')
                    }
                setIsLoading(false)
            })()
        }
    }

    return (
        <div className="wrapper">
            <form action="" className="form-login" onSubmit={submitHandler}>
                <h1 className="form-heading">{isLogin ? 'Login' : 'Sign Up'}</h1>
                <div className="form-group">
                    <UserIcon className="form-user-icon"/>
                    <input type="text" className="form-input" placeholder="Username" onChange={(e) => setInputUserName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <KeyIcon className="form-user-icon"></KeyIcon>
                    <input type="password" className="form-input" placeholder="Password" onChange={(e) => setInputPassword(e.target.value)}/>
                        <div id="eye">
                            <i className="far fa-eye"/>
                        </div>
                </div>
                {!isLoading && <input type="submit" value={`${isLogin ? 'Login' : 'Create Account'}`} className="form-submit"/>}
                {isLoading && <p>Sending request ...</p>}
                <button type='button' className='toggle' onClick={switchAuthModeHandler}>
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </form>
        </div>
    )
}

export default AuthForm;