import FormFileInput from "./FormFileInput";
import {useState} from "react";
import Button from "../../layout/Button";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../context-menu/ContextMenu";
import "./FileContainer.scss";
import {downloadFile} from "../../util";

const FileContainer = (props) => {
    const [contextMenuId, setContextMenuId] = useState(null)
    const [fileFormShow, setFileFormShow] = useState(false);
    const [files, setFiles] = useState([]);
    const params = useParams()
    const parentId = params.folderId;

    const showFileInputForm = () => {
        setFileFormShow(true)
    }

    const hideFileForm = () => {
        setFileFormShow(false)
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

    const addFile = (file) => {
        const fileDetail = {
            name: file.name,
            img: require('../../assets/text-logo.png'),
            _parentFolder: params.folderId,
            _id: file._id
        }

        console.log(fileDetail)

        setFiles(files => [...files, fileDetail])
    }

    const deleteFile = (id) => {
        setFiles(files => files.filter(file => file._id !== id))
    }

    const CustomMenu = (props) => {
        const deleteFile = () => {
            httpClient.delete('/file/' + props.file._id)
                .then(res => console.log(res))

            props.onDelete(props.file._id)
        }

        const download = () => {
            httpClient.get('/file/' + props.file._id, {
                responseType: "blob"
            })
                .then(res => downloadFile(res.data, props.file.name))
        }

        return (
            <ul className="context-menu-item">
                <li onClick={download}>Download</li>
                <li onClick={deleteFile}>Delete</li>
            </ul>
        );
    }

    const showContextMenu = (id) => {
        setContextMenuId(id);
    }

    return (
        <div>
            <div className="file-container">
                <p className="title">All files:</p>
                {files.map((item, index) => {
                    return (
                        <ContextMenu
                            menu={<CustomMenu folderId={item._parentFolder} onDelete={deleteFile} file={item}/>}
                            key={index} tabIndex={index} itemId={item._id} showId={contextMenuId}
                            onShow={() => showContextMenu(item._id)}>
                            <div className="menu-item">
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

            {fileFormShow && <FormFileInput folderId={parentId} closeForm={hideFileForm} onAddFile={addFile}/>}
        </div>
    )
}

export default FileContainer;
