import './App.css';
import FileStorageBtn from './component/file-storage/FileStorageBtn';
import TextStorage from "./component/text-storage/TextStorage";
import Menu from './component/menu/Menu';
import FormInput from './component/file-storage/FormInput';
import Modal from './layout/Modal';
import { useState } from 'react';

function App() {
    const [formShow, setFormShow] = useState(false)
    const [menuItems, setMenuItems] = useState([])

    const showInputForm = () => {
        setFormShow(true)
    }

    const hideForm = () => {
        setFormShow(false)
    }

    const addFileHandle = (item) => {

        console.log(item)
        setMenuItems(items => [...items, {
            img: item.img,
            name: item.name
        }])
    }

    return (
        <div className="App">
            {formShow && <Modal closeForm={hideForm}/>}
            <Menu listItems={menuItems}/>
            <FileStorageBtn showForm={showInputForm}/>
            {formShow && <FormInput closeForm={hideForm} addFile={addFileHandle}/>}
            <TextStorage/>
        </div>
    );
}

export default App;
