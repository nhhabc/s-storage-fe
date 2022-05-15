import FormFileInput from "./FormFileInput";
import {useRef, useState} from "react";
import Button from "../../layout/Button";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../store/ContextMenu";
import "./FileContainer.scss";
import {downloadFile} from "../../util";

const FileContainer = (props) => {
    const contextMenuRef = useRef()
    const [files, setFiles] = useState([]);
    const params = useParams()
    const parentId = params.folderId;

    const hideFileForm = () => {
        props.hideForm()
    }

    useEffect(() => {
        if (parentId) {
            httpClient.get('/file?folderId=' + parentId)
                .then(res => {
                    setFiles(res.data.data.file)
                });
        } else {
            httpClient.get('/file/root')
                .then(res => {
                    setFiles(res.data.data.file)
                });
        }
    }, [parentId]);

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
            _id: file._id
        }

        setFiles(files => [...files, fileDetail])
    }

    const deleteFile = (id) => {
        setFiles(files => files.filter(file => file._id !== id))
    }

    const CustomMenu = (props) => {
        const deleteFile = () => {
            httpClient.delete('/file/' + props.id)
                .then(res => console.log(res))

            props.onDelete()
        }

        const download = () => {
            httpClient.get('/file/' + props.id, {
                responseType: "blob"
            })
                .then(res => downloadFile(res.data, props.name))
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
                {files.map((item, index) => {
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
