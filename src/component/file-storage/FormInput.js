import './FormInput.scss'

const FormInput = () => {
    return (
        <div className='form'>
            <form className='form__input'>
                <input type='file' name='filename' className='form__input-file'/>
                <input type='text' name="desciption" placeholder='Add name of file' className='form__input-desc'/>
                <input type='submit' className='form__input-btn'/>
            </form>
        </div>
    )
}

export default FormInput