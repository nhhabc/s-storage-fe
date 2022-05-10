import './FolderContainer.scss'
import Button from "../../layout/Button";
import AddFolderForm from "./AddFolderForm";
import {useState} from "react";
import httpClient from "../../api/http-client";
import {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import FileContainer from "../file/FileContainer";
import {ContextMenu} from "../context-menu/ContextMenu";
import {ReactComponent as FolderIcon} from "../../assets/folder-ico.svg";

const FolderContainer = () => {
    const [contextMenuId, setContextMenuId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [listFolder, setListFolder] = useState([])
    const params = useParams()
    const folderId = params.folderId;

    useEffect(() => {
        if (folderId) {
            httpClient.get("/folder/" + folderId).then(res => {
                setListFolder(res.data.folder)
            })
        } else {
            httpClient.get("/folder/root").then(res => {
                setListFolder(res.data.folder)
            })
        }
    }, [folderId]);

    const addFolderFunction = (item) => {
        if (item.name.trim() === 0) return;


        // Save to server
        httpClient.post('/folder', {
            name: item.name,
            _parentId: folderId ? folderId : null,
        })
            .then(function (response) {
                const newFolder = response.data.folder;
                setListFolder(items => {
                    return [...items, newFolder]
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const closeFormFunction = () => {
        setShowForm(false)
    }

    const deleteFolder = (ids) => {
        setListFolder(folders => folders.filter(folder => folder.id !== ids))
    }

    const CustomMenu = (props) => {
        return (
            <ul className="context-menu-item">
                <Link to={`/folder/${props.id}`}>Open</Link>
                <li onClick={() => props.onRemove(props.id)}>Delete</li>
            </ul>
        );
    }

    const showContextMenu = (id) => {
        setContextMenuId(id);
    }

    return (
        <div className='cover'>
            <div className='folder-container'>
                <p className="folder-container__menu">All folder:</p>
                {listFolder.map((item, index) => {
                    return (
                        <ContextMenu menu={<CustomMenu onRemove={deleteFolder} id={item._id}/>} key={index} showId={contextMenuId} onShow={() => showContextMenu(item._id)}>
                            <Link to={`/folder/${item._id}`} className='folder-container__item'>
                                <FolderIcon className='folder-container__icon'/>
                                <p>{item.name}</p>
                            </Link>
                        </ContextMenu>
                    )
                })}
            </div>

            <FileContainer/>
            <Button funct={setShowForm}>Add Folder</Button>
            {showForm &&
            <AddFolderForm closeForm={closeFormFunction} addFolder={addFolderFunction} listFolder={listFolder}/>}
        </div>
    )
}

export default FolderContainer;