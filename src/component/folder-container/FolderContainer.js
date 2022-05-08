import './FolderContainer.scss'
import Button from "../../layout/Button";
import FolderList from "./FolderList";
import AddFolderForm from "./AddFolderForm";
import {useState} from "react";
import httpClient from "../../api/http-client";
import { useEffect } from 'react';

const FolderContainer = () => {
    const [showForm, setShowForm] = useState(false)
    const [listFolder, setListFolder] = useState([])
    const id = (Date.now()).toString();

    useEffect(() => {
        httpClient.get("/folderroot").then(res => {
            setListFolder(res.data.folder)
        })
    }, []);

    const addFolderFunction = (item) => {
        if (item.name.trim() === 0) return;

        const newFolder = {
            id,
            name: item.name,
            createdDate: new Date(),
        }
        // Save to server
        httpClient.post('/folder', {
            id,
            name: item.name,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setListFolder(items => {
            return [...items, newFolder]
        })
    }
    
    const closeFormFunction = () => {
        setShowForm(false)
    }

    const onDeleteFolder = (ids) => {
        setListFolder(folders => folders.filter(folder=> folder.id !== ids))
    }
    
    return (
        <div className='cover'>
            <FolderList deleteFolder={onDeleteFolder} listFolder={listFolder}/>
            <Button funct={setShowForm}>Add Folder</Button>
            {showForm && <AddFolderForm closeForm={closeFormFunction} addFolder={addFolderFunction} listFolder={listFolder}/>}
        </div>
    )
}

export default FolderContainer;