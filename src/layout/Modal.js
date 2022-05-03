import './Modal.scss'

const Modal = (props) => {
    return (
        <div className="modal" onClick={props.closeForm}></div>
    )
}

export default Modal