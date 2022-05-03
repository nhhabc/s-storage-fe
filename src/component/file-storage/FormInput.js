

const FormInput = () => {
    return (
        <div className='formInput'>
            <form>
                <input type='text' name="desciption"/>
                <input type='file' id='myFile' name='filename'/>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default FormInput