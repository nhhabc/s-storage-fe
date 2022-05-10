import FormFileInput from "./FormFileInput";
import {useState} from "react";
import Button from "../../layout/Button";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../context-menu/ContextMenu";
import "./FileContainer.scss";

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

    useEffect(()=> {
        if (parentId) {
            httpClient.get('/file/'+parentId)
                .then(res => {
                    setFiles(res.data.data.file)
                });
        } else {
            httpClient.get('/file/root')
                .then(res => {
                    setFiles(res.data.data.file)
                });
        }
    },[parentId])

    const addFile = (file) => {
        const fileDetail = {
            name: file.name,
            img: require('../../assets/text-logo.png'),
            _parentFolder: params.folderId
        }

        setFiles(files => [...files, fileDetail])
    }

    const deleteFile = () => {

    }

    const CustomMenu = (props) => {
        return (
            <ul className="context-menu-item">
                <li>Download</li>
                <li onClick={props.onDelete}>Delete</li>
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
                        <ContextMenu menu={<CustomMenu folderId={item._parentFolder} onDelete={deleteFile}/>} key={index} tabIndex={index} itemId={item._id} showId={contextMenuId} onShow={() => showContextMenu(item._id)}>
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


            <Button funct={showFileInputForm}>Add File</Button>
            {fileFormShow && <FormFileInput folderId={parentId} closeForm={hideFileForm} onAddFile={addFile}/>}
        </div>
)
}

export default FileContainer;