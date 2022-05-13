import './App.scss';
import FolderContainer from "./component/folder/FolderContainer";
import {Route, Routes} from "react-router-dom";
import TextStorage from './component/text-storage/TextStorage';
import MainHeader from './layout/MainHeader';
import LogIn from "./component/log-in/LogIn";

function App() {
    return (
        <div className="App">
            <MainHeader />
            <main>
            <Routes>
                <Route path='/' element={<LogIn/>}/>
                <Route path='/folder' element={<FolderContainer/>}/>
                <Route path='/folder/:folderId' element={<FolderContainer/>}/>
                <Route path='/msg' element={<TextStorage/>}/>
            </Routes>
            </main>
        </div>
    );
}

export default App;
