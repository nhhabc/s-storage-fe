import { Link } from "react-router-dom";
import {ReactComponent as FolderIcon} from "../../assets/folder-ico.svg";
import './FolderContainer.scss'
import { ContextMenu } from "../context-menu/context-menu";
import httpClient from "../../api/http-client";

const CustomMenu = (props) => {

    const deleteFolderFunct = () => {

        httpClient.delete('/folder/' + props.id).then(res=>console.log(res))

        props.onRemove(props.id)
    }

    return (
        <ul className="context-menu">
            <Link to={`/folder/${props.id}`}>Open</Link>
            <li onClick={deleteFolderFunct}>Delete</li>
        </ul>
    );
}


const FolderList = (props) => {

    return (
        <div className='folder-container'>
                <p className="folder-container__menu">All folder:</p>
            {props.listFolder.map((item, index) => {
                return (
                    <ContextMenu menu={<CustomMenu onRemove={props.deleteFolder} id={item.id}/>}>
                    <Link to={`/folder/${item.id}`} className='folder-container__item' key={index}>
                        <FolderIcon className='folder-container__icon'/>
                        <p>{item.name}</p>
                    </Link>
                    </ContextMenu>
                    
                )
            })}
        </div>
    )
}

export default FolderList;