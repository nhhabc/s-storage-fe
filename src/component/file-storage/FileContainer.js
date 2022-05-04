import Modal from "../../layout/Modal";
import Menu from "../menu/Menu";
import FormInput from "./FormInput";
import {useState} from "react";
import Button from "../../layout/Button";


const FileContainer = () => {

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
        <div>
            <Menu listItems={menuItems}/>
            <Button funct={showInputForm}>Add File</Button>
            {formShow && <FormInput closeForm={hideForm} addFile={addFileHandle}/>}
        </div>
)
}

export default FileContainer;