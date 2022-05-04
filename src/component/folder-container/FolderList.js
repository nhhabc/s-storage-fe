import {ReactComponent as FolderIcon} from "../../assets/folder-ico.svg";
import './FolderContainer.scss'

const FolderList = (props) => {

    return (
        <div className='folder-container'>
            {props.listFolder.map((item, index) => {
                return (
                    <div className='folder-container__item' key={index}>
                        <FolderIcon className='folder-container__icon'/>
                        <p>{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default FolderList;