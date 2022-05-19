import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './AuthForm.scss'
import {ReactComponent as KeyIcon} from "../../assets/key.svg";
import {ReactComponent as UserIcon} from "../../assets/user.svg";
import httpClient from "../../api/http-client";
import UserService from "../../services/UserService";
import {ReactComponent as FbIcon} from "../../assets/fb-ico.svg";
import {ReactComponent as GGIcon} from "../../assets/google-ico.svg";
import {ReactComponent as TwitterIcon} from "../../assets/twitter-ico.svg";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const AuthForm = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);
    const [inputUsername, setInputUserName] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
        setIsError(false)
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
                    UserService.login(data.token)
                    window.location.reload();
                    navigate('/welcome')
                } catch (err) {
                    setIsError(true)
                    console.log(err)
                    setErrorMsg('Incorrect username or password')
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
                        window.location.reload();
                    } catch (err) {
                        setIsError(true)
                        setErrorMsg('Invalid  username or password')
                    }
                setIsLoading(false)
            })()
        }
    }

    const responseFacebook = (response) => {
        console.log(response);
        UserService.login(response.accessToken)
        if (response.accessToken) {
            window.location.reload();
            navigate('/welcome')
        } else {
            setErrorMsg('Cannot connect with your facebook acount')
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
                </div>
                {!isLoading && isError && <div className='error'>{errorMsg}</div>}
                {!isLoading && <input type="submit" value={`${isLogin ? 'Login' : 'Create Account'}`} className="form-submit"/>}
                {isLoading && <p>Sending request ...</p>}
                <button type='button' className='toggle' onClick={switchAuthModeHandler}>
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
                <div className='form-login__media'>
                    <FacebookLogin
                        appId="557164842420625"
                        callback={responseFacebook}
                        render={renderProps => (
                            <FbIcon onClick={renderProps.onClick} className='form-login__media-fb'></FbIcon>
                        )}
                    />
                    <GGIcon className='form-login__media-google'></GGIcon>
                    <TwitterIcon className='form-login__media-twitter'></TwitterIcon>
                </div>
            </form>
        </div>
    )
}

export default AuthForm;