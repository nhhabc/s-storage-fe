import './FolderContainer.scss'
import AddFolderForm from "./AddFolderForm";
import {useRef, useState} from "react";
import {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import FileContainer from "../file/FileContainer";
import {ContextMenu} from "../context-menu/ContextMenu";
import {ReactComponent as FolderIcon} from "../../assets/folder-ico.svg";
import FolderApi from "../../api/FolderApi";
import SearchBar from "../../layout/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {storageAction} from "../../store/storage-slice";

const FolderContainer = () => {
    const contextMenuRef = useRef(null)
    const [showFolderForm, setShowFolderForm] = useState(false)
    const [showFileForm, setShowFileForm] = useState(false)
    const params = useParams()
    const folderId = params.folderId;
    const dispatch = useDispatch()
    const filteredFolderList = useSelector((state) => state.storage.filteredFolders)

    useEffect(() => {
        if (folderId) {
            FolderApi.getChildrenFolder(folderId).then(res => {
                dispatch(storageAction.getAllFolder(res.folder))
            })

        } else {
            FolderApi.getRootFolder().then(res => {
                dispatch(storageAction.getAllFolder(res.folder))
            });
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
        FolderApi.createFolder(item, folderId)
            .then(function (response) {
                const newFolder = response.folder;
                dispatch(storageAction.addFolder(newFolder))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const closeFormFunction = () => {
        setShowFolderForm(false)
    }

    const deleteFolder = (id) => {
        console.log(id)
        dispatch(storageAction.deleteFolder(id))
    }

    const handleContextMenuClick = (e, data) => {
        e.preventDefault();
        e.stopPropagation()
        contextMenuRef.current.showMenu(e.pageX, e.pageY, data);
    }

    const CustomMenu = (props) => {
        const deleteFolder = () => {
            FolderApi.deleteFolder(props.id)
                .then(res => console.log(res))

            props.onDelete()
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
            <SearchBar/>
            <div className='folder-container'>
                <p className="folder-container__menu">All folder:</p>
                {filteredFolderList.map((item, i) => {
                    return (
                        <Link to={`/folder/${item._id}`} className='folder-container__item'
                              onContextMenu={(e) => handleContextMenuClick(e, {
                                  menu: <CustomMenu onDelete={() => deleteFolder(item._id)} id={item._id}/>
                              })} key={i}>
                            <FolderIcon className='folder-container__icon'/>
                            <p>{item.name}</p>
                        </Link>
                    )
                })}
            </div>
            <hr/>
            <FileContainer showForm={showFileForm} hideForm={setFileFormHide}/>
            {showFolderForm &&
            <AddFolderForm closeForm={closeFormFunction} addFolder={addFolderFunction}/>}
            <ContextMenu ref={contextMenuRef}/>
        </div>
    )
}

export default FolderContainer;