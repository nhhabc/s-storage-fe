import './FormInput.scss'

import { useState } from 'react';

const FormInput = (props) => {
    const [selectedFile, setSelectedFile] = useState();

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    

    const getFile = (e) => {
        e.preventDefault();

        if (!selectedFile) throw new Error('Please enter a file');
        
        props.addFile({
            img: require('../../assets/text-logo.png'),
            name: selectedFile.name
        })

        props.closeForm()
    }

    return (
        <div className='form' onSubmit={getFile}>
            <form className='form__input'>
                <div className='form__close' onClick={props.closeForm}>&#10005;</div>
                <input type='file' name='filename' className='form__input-file' onChange={onFileChange}/>
                {selectedFile && <div className='form__input-filetype'>name: {selectedFile.name}{"\n"}type: {selectedFile.type}</div>}
                <input type='submit' className='form__input-btn' value='Upload'/>
                {!selectedFile && <div>You must choose a file</div>}
            </form>
        </div>
    )
}

export default FormInput