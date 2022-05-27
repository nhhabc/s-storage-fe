import {NavLink, useNavigate} from 'react-router-dom';
import './MainHeader.scss'
import UserService from "../services/UserService";
import UserApi from "../api/UserApi";
import SocketApi from "../api/SocketApi";

const MainHeader = () => {
    const isLoggedIn = UserService.isAuthenticated();
    const navigate = useNavigate()

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
                {isLoggedIn && <NavLink activeclassname='active' to='/msg'><p>Message</p></NavLink>}
            </div>
            {!isLoggedIn && <button onClick={() => navigate('/login')}>Login</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </div>
    )
}

export default MainHeader;