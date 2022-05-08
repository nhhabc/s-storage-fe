import './Menu.js';
import './Menu.scss';
import {ContextMenu} from "../context-menu/context-menu";
import httpClient from '../../api/http-client.js';

const CustomMenu = (props) => {

    const removeFile = () => {
        httpClient.delete('/file/'+props.id)
        .then(res => console.log(res))

        props.deleteFile(props.id)
    }

    return (
        <ul className="context-menu">
            <li>Download</li>
            <li onClick={removeFile}>Delete</li>
        </ul>
    );
}

function Menu(props) {
    return (
        <div className="menu">
            <p className="title">All files:</p>
            {props.listItems.map((item, index) => {
                return (
                    <ContextMenu menu={<CustomMenu folderId={item._parentFolder} id={item.id} deleteFile={props.removeFile}/>}>
                        <div className="menu-item" key={index}>
                            <div className="menu-image">
                                <img src={require('../../assets/text-logo.png')} alt={item.name}/>
                            </div>
                            <div className="menu-title">
                                {item.name}
                            </div>
                        </div>
                    </ContextMenu>
                )
            })}

        </div>
    );
}

export default Menu;
