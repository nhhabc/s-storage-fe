import './Button.scss'

const Button = (props) => {
    return (
        <div className='formInputBtn'>
            <div className='btn'>
                <button className='btn__add' onClick={props.funct}>{props.children}<span>&rarr;</span></button>
            </div>
        </div>
    )
}

export default Button;