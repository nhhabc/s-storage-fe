import Menu from "../menu/Menu";
import FormFileInput from "./FormFileInput";
import {useState} from "react";
import Button from "../../layout/Button";
import {useParams} from "react-router-dom";

const FileContainer = (props) => {
    const [formShow, setFormShow] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const params = useParams()

    const showInputForm = () => {
        setFormShow(true)
    }

    const hideForm = () => {
        setFormShow(false)
    }

    const addFileHandle = (item) => {
        setMenuItems(items => [...items, {
            img: item.img,
            name: item.name
        }])
    }

    return (
        <div>
            <Menu listItems={menuItems}/>
            <Button funct={showInputForm}>Add File</Button>
            {formShow && <FormFileInput folderId={params.folderId} closeForm={hideForm} addFile={addFileHandle}/>}
        </div>
)
}

export default FileContainer;