import {Link, NavLink, useNavigate} from 'react-router-dom';
import './MainHeader.scss'
import UserService from "../services/UserService";
import UserApi from "../api/UserApi";
import SocketApi from "../api/SocketApi";
import {useDispatch} from "react-redux";
import {messageAction} from "../store/message-slice";
import {useEffect, useState} from "react";

const MainHeader = () => {
    const isLoggedIn = UserService.isAuthenticated();
    const [username, setUsername] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        isLoggedIn && UserApi.getUser().then(res => {
            setUsername(res.user.username)
        })
    }, [isLoggedIn])

    const logoutHandler = async () => {
        const res = await UserApi.getUser()

        SocketApi.disconnect(res.user._id)
        UserService.logout()
        window.location.reload();
        navigate('/login');
    }

    return (
        <div className='nav'>
            <div className='nav__logo' onClick={() => navigate('/welcome')}>S-Storage</div>
            <div className='nav__options'>
                {isLoggedIn && <NavLink activeclassname='active' to='/folder'><p>Folder</p></NavLink>}
                {isLoggedIn && <NavLink activeclassname='active' to='/msg'
                                        onClick={() => dispatch(messageAction.closeMsgHandle(false))} reloadDocument>
                    <p>Message</p></NavLink>}
            </div>
            <div className='nav__status'>
                {isLoggedIn && <div className='nav__status-greet'>Welcome, <Link to='/profile'
                                                                   className='nav__status-profile'>{username}</Link>
                </div>}
                {!isLoggedIn && <button onClick={() => navigate('/login')}>Login</button>}
                {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
            </div>
        </div>
    )
}

export default MainHeader;