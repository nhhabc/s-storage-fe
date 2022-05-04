import {useRef} from "react";

const AddFolderForm = (props) => {
    const inputRef = useRef();

    const createFolder = (e) => {
        e.preventDefault();
        props.addFolder({
            name: inputRef.current.value,
        })

        props.closeForm()
    }

    return (
        <div className='form' onSubmit={createFolder}>
            <div className='form__close' onClick={props.closeForm}>&#10005;</div>
            <form className='form__input'>
                <p>Set a name</p>
                <input type='text' name='folder name' className='form__input-folder' ref={inputRef}/>
                <input type='submit' className='form__input-btn' value='Create'/>
            </form>
        </div>
    )
}

export default AddFolderForm;