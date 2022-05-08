import Menu from "../menu/Menu";
import FormFileInput from "./FormFileInput";
import {useState} from "react";
import Button from "../../layout/Button";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import httpClient from "../../api/http-client";
import AddFolderForm from "../folder-container/AddFolderForm";
import FolderList from "../folder-container/FolderList";

const FileContainer = (props) => {
    const [fileFormShow, setFileFormShow] = useState(false);
    const [folderFormShow, setFolderFormShow] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [listFolder, setListFolder] = useState([])
    const params = useParams()
    const id = (Date.now()).toString()

    const showFileInputForm = () => {
        if(folderFormShow) {
            setFolderFormShow(false)
        }

        setFileFormShow(true)
    }

    const showFolderInputForm = () => {
        if(fileFormShow) {
            setFileFormShow(false)
        }

        setFolderFormShow(true)
    }

    const hideFileForm = () => {
        setFileFormShow(false)
    }

    const hideFolderForm = () => {
        setFolderFormShow(false)
    }

    useEffect(()=> {
        httpClient.get('/file/'+params.folderId)
            .then(res => {
                setMenuItems(res.data.data.file)
           });
    },[])

    useEffect(()=> {
        httpClient.get('/folder/'+params.folderId)
            .then(res => {
                setListFolder(res.data.folder)
           });
    },[])

    const addFolderFunction = (folder) => {
        const newFolder = {
            id,
            name: folder.name,
            createdDate: new Date(),
            parentId: params.folderId
        }
        // Save to server
        httpClient.post('/folder', {
            id,
            parentId: params.folderId,
            name: folder.name,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setListFolder(folders => [...folders, newFolder])
    }

    const onAddFile = (file) => {
        const fileDetail = {
            id,
            name: file.name,
            img: require('../../assets/text-logo.png'),
            _parentFolder: params.folderId
        }

        setMenuItems(files => [...files, fileDetail])
    }

    const onDeleteFile = (ids) => {
        setMenuItems(files => files.filter(file => file.id !== ids))
    }

    const onDeleteFolder = (ids) => {
        setListFolder(folders => folders.filter(folder=> folder.id !== ids))
    }

    return (
        <div className="cover">
            <FolderList deleteFolder={onDeleteFolder} listFolder={listFolder}/>
            <Menu listItems={menuItems} folderId={params.folderId} removeFile={onDeleteFile}/>
            <Button funct={showFileInputForm}>Add File</Button>
            <Button funct={showFolderInputForm}>Add Folder</Button>
            {fileFormShow && <FormFileInput folderId={params.folderId} closeForm={hideFileForm} addFile={onAddFile} id={id}/>}
            {folderFormShow && <AddFolderForm addFolder={addFolderFunction} closeForm={hideFolderForm}/>}
        </div>
)
}

export default FileContainer;