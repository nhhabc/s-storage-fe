import './FileStorageBtn.scss';
import FormInput from './FormInput';

const FileStorageBtn = (props) => {
    return (
        <div className='formInputBtn'>
            <div className='btn'>
                <button className='btn__add' onClick={props.showForm}>Add file<span>&rarr;</span></button>
            </div>
        </div>
        
    )
}

export default FileStorageBtn; 