import {useRef} from "react";
import { useState } from "react";

const AddFolderForm = (props) => {
    const inputRef = useRef();
    const [validInput, setValidInput] = useState(true)

    const createFolder = (e) => {
        e.preventDefault();

        const folderName = inputRef.current.value;
        if(!folderName) {
            setValidInput(false)
            return
        };

        props.addFolder({
            name: folderName,
        })
        
        props.closeForm();
    }

    return (
        <div className='form' onSubmit={createFolder}>
            <div className='form__close' onClick={props.closeForm}>&#10005;</div>
            <form className='form__input'>
                <p>Set a name</p>
                <input type='text' name='folder name' className='form__input-folder' ref={inputRef}/>
                <input type='submit' className='form__input-btn' value='Create'/>
            </form>
            {!validInput && <div className="form__invalid">Invalid name</div>}
        </div>
    )
}

export default AddFolderForm;