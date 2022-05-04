import './App.css';
import Menu from './component/menu/Menu';
import FormInput from './component/file-storage/FormInput';
import Modal from './layout/Modal';
import { useState } from 'react';
import FileContainer from "./component/file-storage/FileContainer";
import FolderContainer from "./component/folder-container/FolderContainer";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<FolderContainer/>}/>
                <Route path='/:id' element={<FileContainer/>}/>
            </Routes>
        </div>
    );
}

export default App;
