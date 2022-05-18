import FormFileInput from "./FormFileInput";
import {useRef} from "react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {ContextMenu} from "../context-menu/ContextMenu";
import "./FileContainer.scss";
import {downloadFile} from "../../util";
import FileApi from "../../api/FileApi";
import {useDispatch, useSelector} from "react-redux";
import {storageAction} from "../../store/storage-slice";

const FileContainer = (props) => {
    const contextMenuRef = useRef()
    const dispatch = useDispatch()
    const params = useParams()
    const parentId = params.folderId;
    const fileList = useSelector((state) => state.storage.files)

    const hideFileForm = () => {
        props.hideForm()
    }

    useEffect(() => {
        if (parentId) {
            FileApi.getChildrenFile(parentId)
                .then(res => {
                    dispatch(storageAction.getAllFile(res.file))
                });
        } else {
            FileApi.getRootFile().then(res => {
                    dispatch(storageAction.getAllFile(res.file))
            })
        }
    }, []);

    const handleContextMenuClick = (e, data) => {
        e.preventDefault()
        e.stopPropagation()
        contextMenuRef.current.showMenu(e.pageX, e.pageY, data)
    }

    useEffect(() => {
            document.addEventListener("click", () => {
                if (contextMenuRef.current) {
                    contextMenuRef.current.hideMenu();
                }
            });
            return () => {
                document.removeEventListener("click", () => {
                    if (contextMenuRef.current) {
                        contextMenuRef.current.hideMenu()
                    }
                });
            }
        }
    )

    const addFile = (file) => {
        const fileDetail = {
            name: file.name,
            img: require('../../assets/text-logo.png'),
            path: file.path,
            _parentFolder: params.folderId,
            _id: file._id,
        }
        dispatch(storageAction.addFile(fileDetail))
    }

    const deleteFile = (id) => {
        dispatch(storageAction.deleteFile(id))
    }

    const CustomMenu = (props) => {
        const deleteFile = () => {
            FileApi.deleteFile(props.id)
                .then(res => console.log(res))

            props.onDelete()
        }

        const download = () => {
            FileApi.downloadFileHandle(props.id)
                .then(res => downloadFile(res, props.name))
        }

        return (
            <ul className="context-menu-item">
                <li onClick={download}>Download</li>
                <li onClick={deleteFile}>Delete</li>
            </ul>
        );
    }

    return (
        <div>
            <div className="file-container">
                <p className="title">All files:</p>
                {fileList.map((item, index) => {
                    return (
                        <div className="menu-item" onContextMenu={(e) =>
                            handleContextMenuClick(e, {
                                menu: <CustomMenu onDelete={() => deleteFile(item._id)} name={item.name} id={item._id}/>
                            })} key={index}>
                            <div className="menu-image">
                                <img src={require('../../assets/text-logo.png')} alt={item.name}/>
                            </div>
                            <div className="menu-title">
                                {item.name}
                            </div>
                        </div>
                    )
                })}

            </div>
            <ContextMenu ref={contextMenuRef}/>
            {props.showForm && <FormFileInput folderId={parentId} closeForm={hideFileForm} onAddFile={addFile}/>}
        </div>
    )
}

export default FileContainer;
