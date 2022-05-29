import './Caution.scss'
import {useDispatch} from "react-redux";
import {userAction} from "../../store/user-slice";
import {useRef, useState} from "react";
import UserApi from "../../api/UserApi";
import UserService from "../../services/UserService";

const Caution = () => {
    const [confirm, setConfirm] = useState(false)
    const dispatch = useDispatch()
    const inputPasswordRef = useRef()
    const [isErr, setIsErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const deleteAccount = async (e) => {
        try {
            setIsLoading(true)
            setIsErr(false)
            e.preventDefault()
            const confirmPassword = inputPasswordRef.current.value
            if(!confirmPassword) {
                setIsErr(true)
                setErrMsg('Please enter your password')
                return
            }
            await UserApi.deleteAccount(confirmPassword)
            UserService.logout()
            window.location.reload()
        } catch (err) {
            setIsErr(true)
            setErrMsg('Password is not correct')
            setIsLoading(false)
        }
    }

    return (
        <div className='wrap'>
            <div className='modal' onClick={() => dispatch(userAction.checkDeleteAccount(false))}></div>
            <form className='caution' onSubmit={deleteAccount}>
                <div className='caution__close' onClick={() => dispatch(userAction.checkDeleteAccount(false))}>&#x2715;</div>
                {!confirm ? <p>Are your sure want to delete the account?</p> : <p>Please enter your password to confirm this action</p>}
                {!confirm ? <span>If you delete this account, all the data in it <b>will be lost</b></span> :
                    <input type="password" placeholder='Confirm Password' autoComplete='on' ref={inputPasswordRef}/>}
                {isErr && <span className='error'>{errMsg}</span>}
                {!isLoading && <div className='caution__choice'>
                    <div className='caution__btn'
                         onClick={() => dispatch(userAction.checkDeleteAccount(false))}>Cancel
                    </div>
                    {!confirm ? <div className='caution__btn' id='delete' onClick={() => setConfirm(true)}>Delete
                            Account</div> :
                        <input type='submit' value='Confirm' className='caution__btn' id='delete'/>}
                </div>}
                {isLoading && <div>Loading...</div>}
            </form>
        </div>
    )
}

export default Caution