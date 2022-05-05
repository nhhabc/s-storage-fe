import { Link } from 'react-router-dom';
import './MainHeader.scss'

const MainHeader = () => {
    return (
        <div className='nav'>
                <Link to='/folder'><p>Folder</p></Link>
                <Link to='/msg'><p>Message</p></Link>
        </div>
    )
}

export default MainHeader;