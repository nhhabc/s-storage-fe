import './App.css';
import Menu from "./component/menu/Menu";
import TextStorage from "./component/text-storage/TextStorage";
import {useEffect} from "react";

function App() {

    return (
        <div className="App">
                {/*<Menu/>*/}
                <TextStorage/>
        </div>
    );
}

export default App;
