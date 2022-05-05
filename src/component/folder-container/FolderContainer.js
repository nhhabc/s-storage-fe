import './FolderContainer.scss'
import Button from "../../layout/Button";
import FolderList from "./FolderList";
import AddFolderForm from "./AddFolderForm";
import {useState} from "react";

const FolderContainer = () => {
    const [showForm, setShowForm] = useState(false)
    const [listFolder, setListFolder] = useState([])

    const closeFormFunction = () => {
        setShowForm(false)
    }

    const addFolderFunction = (item) => {
        setListFolder(items => {
            return [...items, {name:item.name}]
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