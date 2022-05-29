import './App.scss';
import FolderContainer from "./component/folder/FolderContainer";
import {Route, Routes, Navigate} from "react-router-dom";
import TextStorage from './component/text-storage/TextStorage';
import MainHeader from './layout/MainHeader';
import AuthForm from "./component/log-in/AuthForm";
import Welcome from "./layout/Welcome";
import UserService from "./services/UserService";
import Footer from "./layout/Footer";
import UserProfile from "./component/user-profile/UserProfile";

function App() {

    const isLoggedIn = UserService.isAuthenticated();

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
                {isLoggedIn && <Route path='/profile' element={<UserProfile/>}/>}
            </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
