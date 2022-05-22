import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './AuthForm.scss'
import {ReactComponent as KeyIcon} from "../../assets/key.svg";
import {ReactComponent as UserIcon} from "../../assets/user.svg";
import UserService from "../../services/UserService";
import {ReactComponent as FbIcon} from "../../assets/fb-ico.svg";
import {ReactComponent as GGIcon} from "../../assets/google-ico.svg";
import {ReactComponent as TwitterIcon} from "../../assets/twitter-ico.svg";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import UserApi from "../../api/UserApi";
import {SocialType} from "../../model/social-type";

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

        const userInputValue = inputUsername.toLowerCase();
        const passwordInputValue = inputPassword;

        setIsLoading(true)
        if (isLogin) {
            (async () => {
                try {
                    const res = UserApi.userLogin(userInputValue, passwordInputValue)
                    const data = await res
                    UserService.login(data.token)
                    console.log(res.user)
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
                        await UserApi.userSignup(userInputValue, passwordInputValue)
                        window.location.reload();
                    } catch (err) {
                        setIsError(true)
                        setErrorMsg('Invalid  username or password')
                    }
                setIsLoading(false)
            })()
        }
    }

    const responseFacebook = async (response) => {
        UserService.login(response.accessToken)
        if (response.accessToken) {
            const { isExist } = await UserApi.checkUsername(response.email);
            if (!isExist) {
                await UserApi.socialSignup({ email: response.email, socialType: SocialType.FACEBOOK })
            }
            const data = await UserApi.loginSocial({ email: response.email, socialType: SocialType.FACEBOOK })
            UserService.login(data.token)
            window.location.reload();
            navigate('/welcome')
        } else {
            setErrorMsg('Cannot connect with your facebook account')
        }
    }

    const responseGoogle = (res) => {
        console.log(res)
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
                        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                        callback={responseFacebook}
                        fields="email,name"
                        render={renderProps => (
                            <FbIcon onClick={renderProps.onClick} className='form-login__media-fb'/>
                        )}
                    />
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                            <GGIcon onClick={renderProps.onClick} className='form-login__media-google'/>
                            )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                    {/*<GGIcon className='form-login__media-google'/>*/}
                    <TwitterIcon className='form-login__media-twitter'/>
                </div>
            </form>
        </div>
    )
}

export default AuthForm;