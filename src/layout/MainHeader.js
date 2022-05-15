import {NavLink, useNavigate} from 'react-router-dom';
import './MainHeader.scss'
import {useContext} from "react";
import AuthContext from "../component/store/AuthContext";


const MainHeader = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate()

    const logoutHandler = () => {
        authCtx.logout()
        navigate('/login')
    }

    return (
        <div className='nav'>
            {isLoggedIn && <NavLink activeClassName='active' to='/folder'><p>Folder</p></NavLink>}
            {isLoggedIn && <NavLink activeClassName='active' to='/msg'><p>Message</p></NavLink>}
            {!isLoggedIn && <button onClick={() => navigate('/login')}>Login</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </div>
    )
}

export default MainHeader;