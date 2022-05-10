import './App.css';
import FileContainer from "./component/file/FileContainer";
import FolderContainer from "./component/folder/FolderContainer";
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
                <Route path='/folder/:folderId' element={<FolderContainer/>}/>
                <Route path='/msg' element={<TextStorage/>}/>
            </Routes>
            </main>
        </div>
    );
}

export default App;
