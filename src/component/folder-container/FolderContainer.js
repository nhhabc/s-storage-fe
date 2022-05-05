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

    const closeFormFunction = () => {
        setShowForm(false)
    }

    useEffect(() => {
        return () => {
            httpClient.get("/folder").then(res => {
                setListFolder(res.data.folder)
            })
        }
    }, []);

    const addFolderFunction = (item) => {
        if (item.name.trim() === 0) return;

        const newFolder = {
            _id: null,
            name: item.name,
            createdDate: new Date(),
            file:[]
        }
        // Save to server
        httpClient.post('/folder', {
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

    

    return (
        <div className='cover'>
            <FolderList listFolder={listFolder}/>
            <Button funct={setShowForm}>Add Folder</Button>
            {showForm && <AddFolderForm closeForm={closeFormFunction} addFolder={addFolderFunction}/>}
        </div>
    )
}

export default FolderContainer;