import './App.css';
import FileContainer from "./component/file-storage/FileContainer";
import FolderContainer from "./component/folder-container/FolderContainer";
import {Route, Routes} from "react-router-dom";
import TextStorage from './component/text-storage/TextStorage';
import MainHeader from './layout/MainHeader';

function App() {
    return (
        <div className="App">
            <MainHeader />
            <main>
            <Routes>
                <Route path='/folder' element={<FolderContainer/>}/>
                <Route path='/folder/:folderId' element={<FileContainer/>}/>
                <Route path='/message' element={<TextStorage/>}/>
            </Routes>
            </main>
        </div>
    );
}

export default App;
