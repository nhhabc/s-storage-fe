import './App.scss';
import FolderContainer from "./component/folder/FolderContainer";
import {Route, Routes, Navigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "./component/store/AuthContext";
import TextStorage from './component/text-storage/TextStorage';
import MainHeader from './layout/MainHeader';
import AuthForm from "./component/log-in/AuthForm";
import Welcome from "./layout/Welcome";

function App() {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <div className="App">
            <MainHeader />
            <main>
            <Routes>
                <Route
                    path="*"
                    element={<Navigate to="/welcome" replace />}
                />
                {!isLoggedIn && <Route path='/login' element={<AuthForm/>}/>}
                <Route path='/welcome' element={<Welcome/>}/>
                {isLoggedIn && <Route path='/folder' element={<FolderContainer/>}/>}
                {isLoggedIn && <Route path='/folder/:folderId' element={<FolderContainer/>}/>}
                {isLoggedIn && <Route path='/msg' element={<TextStorage/>}/>}
            </Routes>
            </main>
        </div>
    );
}

export default App;
