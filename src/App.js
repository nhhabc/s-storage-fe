import './App.css';
import FileStorageBtn from './component/file-storage/FileStorageBtn';
import TextStorage from "./component/text-storage/TextStorage";
import Menu from './component/menu/Menu';
import FormInput from './component/file-storage/FormInput';
import Modal from './layout/Modal';
import { useState } from 'react';

function App() {
    const [formShow, setFormShow] = useState(false)

    const showInputForm = () => {
        setFormShow(true)
    }

    const hideForm = () => {
        setFormShow(false)
    }

    const addFileHandle = () => {
        
    }

    return (
        <div className="App">
            {formShow && <Modal closeForm={hideForm}/>}
            <Menu/>
            <FileStorageBtn showForm={showInputForm}/>
            {formShow && <FormInput/>}
            {/* <TextStorage/> */}
        </div>
    );
}

export default App;
