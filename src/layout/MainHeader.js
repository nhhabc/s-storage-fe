import {NavLink} from 'react-router-dom';
import './MainHeader.scss'

const MainHeader = () => {
    return (
        <div className='nav'>
            <NavLink activeClassName='active' to='/folder'><p>Folder</p></NavLink>
            <NavLink activeClassName='active' to='/msg'><p>Message</p></NavLink>
        </div>
    )
}

export default MainHeader;