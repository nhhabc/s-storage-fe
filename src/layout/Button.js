import './Button.scss'

const Button = (props) => {
    return (
            <div className='btn'>
                <button className='button-38' onClick={props.funct}>{props.children}<span>&#x2B;</span></button>
            </div>
    )
}

export default Button;