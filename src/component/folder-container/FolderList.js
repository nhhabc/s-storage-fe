import { Link } from "react-router-dom";
import {ReactComponent as FolderIcon} from "../../assets/folder-ico.svg";
import './FolderContainer.scss'

const FolderList = (props) => {

    return (
        <div className='folder-container'>
            {props.listFolder.map((item, index) => {
                return (
                    <Link to={`/folder/${item._id}`} className='folder-container__item' key={index}>
                        <FolderIcon className='folder-container__icon'/>
                        <p>{item.name}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default FolderList;