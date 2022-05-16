import './TextStorage.js';
import './TextStorage.scss';
import {useEffect, useRef, useState} from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../store/ContextMenu";
import {ReactComponent as SendIcon} from "../../assets/send-img.svg";

function TextStorage() {
    const contextMenuRef = useRef()

    const [messages, setMessages] = useState([]);
    const [msgText, setMsgText] = useState("");

    useEffect(() => {
        httpClient.get('/msg').then(res => {
            setMessages(res.data.messages)
        })
    }, []);

    const handleContextMenuClick = (e, data) => {
        e.preventDefault();
        e.stopPropagation()
        contextMenuRef.current.showMenu(e.pageX, e.pageY, data);
    }

    useEffect(() => {
            document.addEventListener("click", () => {
                if (contextMenuRef.current) {
                    contextMenuRef.current.hideMenu()
                }
            });

            return () => {
                document.removeEventListener("click", () => {
                    if (contextMenuRef.current) {
                        contextMenuRef.current.hideMenu()
                    }
                });
            };
        }
    )

    const onSent = () => {
        if (msgText.trim().length === 0) return;
        setMsgText("");


        // Save to server
        httpClient.post('/msg', {
            msg: msgText,
        })
            .then(function (response) {
                setMessages(msg => [...msg, response.data.data])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSent();
        }
    }

    const deleteTextHandle = (id) => {
        setMessages(texts => texts.filter(msg => msg._id !== id))
    }

    const CustomMenu = (props) => {
        const deleteText = () => {
            httpClient.delete('/msg/' + props.id)
                .then(res => console.log(res))
            props.onDelete()
        }

        return (
            <ul className="context-menu-item">
                <li onClick={deleteText}>Delete</li>
            </ul>
        );
    }

    return (
        <div className="msg-wrapper">
            <div className="msg">
                <div className="msg-box">
                    {
                        messages && messages.length === 0 ? <></> : messages.map((msg, index) => {
                            return (
                                <div className="msg-text" key={index}>
                                    <span className="msg-text__text" onContextMenu={(e) =>
                                        handleContextMenuClick(e, {
                                            menu: <CustomMenu onDelete={() => deleteTextHandle(msg._id)} id={msg._id}/>
                                        })}>{msg.text}</span>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="msg-input">
                    <input type="text" className="msg-input__text" value={msgText} onKeyDown={e => handleKeyDown(e)}
                           onChange={e => setMsgText(e.target.value)}/>
                    <div className="msg-input__send" onClick={onSent}>
                        <SendIcon className="msg-input__send-ico"></SendIcon>
                    </div>
                </div>
            </div>
            <ContextMenu ref={contextMenuRef}/>
        </div>
    );
}

export default TextStorage;
