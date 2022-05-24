import {NavLink, useNavigate} from 'react-router-dom';
import './MainHeader.scss'
import UserService from "../services/UserService";
import io from 'socket.io-client';
import UserApi from "../api/UserApi";

const socket = io(process.env.SOCKET_IO_DOMAIN_SERVICE, {transports: ['websocket']})

const MainHeader = () => {
    const isLoggedIn = UserService.isAuthenticated();
    const navigate = useNavigate()

    const logoutHandler = async () => {
        const res = await UserApi.getUser()

        socket.emit('Disconnect', {username: res.user.username})
        UserService.logout()
        window.location.reload();
        navigate('/login');
    }

    return (
        <div className='nav'>
            <div className='nav__logo' onClick={() => navigate('/welcome')}>S-Storage</div>
            <div className='nav__options'>
                {isLoggedIn && <NavLink activeClassName='active' to='/folder'><p>Folder</p></NavLink>}
                {isLoggedIn && <NavLink activeClassName='active' to='/msg'><p>Message</p></NavLink>}
            </div>
            {!isLoggedIn && <button onClick={() => navigate('/login')}>Login</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </div>
    )
}

export default MainHeader;