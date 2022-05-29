import './UserProfile.scss'
import {useEffect, useRef, useState} from "react";
import UserApi from "../../api/UserApi";
import {useDispatch, useSelector} from "react-redux";
import {userAction} from "../../store/user-slice";
import Caution from "./Caution";

const UserProfile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const isChangeName = useSelector(state => state.user.isChangingName)
    const isChangeEmail = useSelector(state => state.user.isChangingEmail)
    const isChangePassword = useSelector(state => state.user.isChangingPassword)
    const isSocialAccount = useSelector(state => state.user.isSocialAccount)
    const isDeleteAccount = useSelector(state => state.user.isDeleteAccount)
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const nameInputRef = useRef()
    const passwordInputRef = useRef()
    const oldPasswordInputRef = useRef()
    const emailInputRef = useRef()

    useEffect(() => {
        (async () => {
            try {
                const res = await UserApi.getUser()
                dispatch(userAction.getCurrentUserInfo(res.user))
            } catch (err) {
                console.log(err)
            }
        })()
    }, [dispatch])

    // const check = (user) => {
    //     if (user && user.socialType.includes('FACEBOOK')) {
    //         return dispatch(userAction.checkSocialUser(true))
    //     } else {
    //         return dispatch(userAction.checkSocialUser(false))
    //     };
    // }

    const checkUser = () => {
        if (currentUser.socialType.length > 0) {
            dispatch(userAction.checkSocialUser(true))
        } else {
            dispatch(userAction.checkSocialUser(false))
        }
        dispatch(userAction.changePassword(true))
    }

    const updateName = async (e) => {
        try {
            e.preventDefault()
            const nameInput = nameInputRef.current.value

            if(!nameInput) {
                setIsError(true)
                setErrMsg('Cannot set blank name')
                return
            };

            await UserApi.updateUserInfo(currentUser._id, {
                name: nameInput
            });
            window.location.reload()
        } catch (err) {
            setIsError(true)
            setErrMsg(err)
        }
    }

    const updatePassword = async (e) => {
        try {
            e.preventDefault()
            const newPassword = passwordInputRef.current.value
            const oldPassword = oldPasswordInputRef.current.value

            await UserApi.updateUserPassword({
                newPassword,
                oldPassword
            })
            dispatch(userAction.changePassword(false))
            setIsError(false)
            setIsSuccess(true)
            setSuccessMsg('Your password has been updated')
        } catch (err) {
            setIsError(true)
            setErrMsg('Old password wrong')
            setIsSuccess(false)
        }
    }

    const updateEmail = async (e) => {
        try {
            e.preventDefault()
            const emailInput = emailInputRef.current.value
            if(!emailInput) {
                setIsError(true)
                setErrMsg('Cannot set blank email')
                return
            };
            await UserApi.updateUserInfo(currentUser._id, {
                email: emailInput
            });
            window.location.reload()
        } catch (err) {
            setIsError(true)
            setErrMsg(err)
        }
    }



    return (
        <div className='wrapper'>
            {isDeleteAccount && <Caution/>}
            <div className='profile'>
                <h2>Profile setting</h2>
                {isError && <p className='error'>{errMsg}</p>}
                {isSuccess && <p className='success'>{successMsg}</p>}
                <hr/>
                <div className='profile__detail'>
                    <form className='profile__form'>
                        <div>
                            <h4>User:</h4>
                            <p>{currentUser.username ? currentUser.username : "(You haven't set your user login yet)"}</p>
                        </div>
                        {!currentUser.username && <div className='profile__form-button'>Change</div>}
                    </form>
                    <form className='profile__form' onSubmit={updateName}>
                        <div>
                            <h4>Name:</h4>
                            {!isChangeName ?
                                <p>{currentUser.name ? currentUser.name : "(You haven't set your name yet)"}</p> :
                                <input className='profile__form-input' type="text" placeholder='Set your name...'
                                       ref={nameInputRef}/>}
                        </div>
                        {!isChangeName ? <div className='profile__form-button'
                                              onClick={() => dispatch(userAction.changeName(true))}>Change</div> :
                            <input type='submit' className='profile__form-button' value='Confirm'/>}
                        {isChangeName && <div className='profile__form-button' id='cancel'
                                              onClick={() => dispatch(userAction.changeName(false))}>Cancel</div>}
                    </form>
                    <form className='profile__form' onSubmit={updatePassword}>
                        <div className='profile__form-password'>
                            <h4>Password:</h4>
                            {!isChangePassword &&
                            <p>{!isSocialAccount ? '*********' : "(You haven't set your password yet)"} </p>}
                            {isChangePassword &&
                            <input type="password" placeholder='Set your new password...' autoComplete="on" ref={passwordInputRef}
                                   className='profile__form-input'/>}
                            {!isSocialAccount && isChangePassword &&
                            <input type="password" placeholder='Confirm your old password...' autoComplete="on" ref={oldPasswordInputRef}
                                   className='profile__form-input'/>}
                        </div>
                        {!isChangePassword ? <div className='profile__form-button'
                                                  onClick={checkUser}>Change</div> :
                            <input type='submit' className='profile__form-button' value='Confirm'/>}
                        {isChangePassword && <div className='profile__form-button' id='cancel'
                                                  onClick={() => dispatch(userAction.changePassword(false))}>Cancel</div>}
                    </form>
                    <form className='profile__form' onSubmit={updateEmail}>
                        <div>
                            <h4>email:</h4>
                            {!isChangeEmail ?
                                <p>{currentUser.email ? currentUser.email : "(You haven't link your email yet)"}</p> :
                                <input className='profile__form-input' type="email" placeholder='Set your email...'
                                       ref={emailInputRef}/>}
                        </div>
                        {!isChangeEmail ? <div className='profile__form-button'
                                               onClick={() => dispatch(userAction.changeEmail(true))}>Change</div> :
                            <input type='submit' value='Confirm' className='profile__form-button'/>}
                        {isChangeEmail && <div className='profile__form-button' id='cancel'
                                               onClick={() => dispatch(userAction.changeEmail(false))}>Cancel</div>}
                    </form>
                </div>
                <div className='profile__delete'>
                    <div className='profile__delete-button' onClick={() => dispatch(userAction.checkDeleteAccount(true))}>Delete account</div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;