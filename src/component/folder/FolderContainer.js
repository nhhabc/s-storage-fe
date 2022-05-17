import './FolderContainer.scss'
import AddFolderForm from "./AddFolderForm";
import {useRef, useState} from "react";
import httpClient from "../../api/http-client";
import {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import FileContainer from "../file/FileContainer";
import {ContextMenu} from "../context-menu/ContextMenu";
import {ReactComponent as FolderIcon} from "../../assets/folder-ico.svg";
import FolderApi from "../../api/FolderApi";

const FolderContainer = () => {
    const contextMenuRef = useRef(null)
    const [showFolderForm, setShowFolderForm] = useState(false)
    const [showFileForm, setShowFileForm] = useState(false)
    const [listFolder, setListFolder] = useState([])
    const params = useParams()
    const folderId = params.folderId;

    useEffect(() => {
        if (folderId) {
            httpClient.get("/folder/" + folderId).then(res => {
                setListFolder(res.data.folder)
            })
        } else {
            FolderApi.getRootFolder().then(res => setListFolder(res.folder));
        }
    }, [folderId]);

    useEffect(() => {

        document.addEventListener("click", () => {
            if (contextMenuRef.current) {
                contextMenuRef.current.hideMenu()
            }
        });

        return () => {
            document.removeEventListener("click", () => {
                if (contextMenuRef.current) {
                    contextMenuRef.current.hideMenu()
                }
            });

        };
    })

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
        setShowFolderForm(false)
    }

    const deleteFolder = (id) => {
        setListFolder(folders => folders.filter(folder => folder._id !== id))
    }

    const handleContextMenuClick = (e, data) => {
        e.preventDefault();
        e.stopPropagation()
        contextMenuRef.current.showMenu(e.pageX, e.pageY, data);
    }

    const CustomMenu = (props) => {
        const deleteFolder = () => {
            httpClient.delete('/folder/' + props.id)
                .then(res => console.log(res))

            props.onDelete(props.id)
        }

        return (
            <ul className="context-menu-item">
                <Link to={`/folder/${props.id}`}>Open</Link>
                <li onClick={deleteFolder}>Delete</li>
            </ul>
        );
    }

    const setFileFormShow = () => {
        setShowFileForm(true)
    }
    const setFileFormHide = () => {
        setShowFileForm(false)
    }

    const CustomMenuFolderContainer = (props) => {
        return (
            <ul className="context-menu-item">
                <li onClick={() => setShowFolderForm(true)}>Create folder</li>
                <li onClick={setFileFormShow}>Create file</li>
            </ul>
        );
    }

    return (
        <div className='cover' onContextMenu={(e) => handleContextMenuClick(e, {menu: <CustomMenuFolderContainer/>})}>
            <div className='folder-container'>
                <p className="folder-container__menu">All folder:</p>
                {listFolder.map((item, index) => {
                    return (
                        <Link to={`/folder/${item._id}`} className='folder-container__item'
                              onContextMenu={(e) => handleContextMenuClick(e, {
                                  menu: <CustomMenu onDelete={() => deleteFolder(item._id)} id={item._id}/>
                              })} key={index}>
                            <FolderIcon className='folder-container__icon'/>
                            <p>{item.name}</p>
                        </Link>
                    )
                })}
            </div>
            <hr/>
            <FileContainer showForm={showFileForm} hideForm={setFileFormHide}/>
            {showFolderForm &&
            <AddFolderForm closeForm={closeFormFunction} addFolder={addFolderFunction} listFolder={listFolder}/>}
            <ContextMenu ref={contextMenuRef}/>
        </div>
    )
}

export default FolderContainer;