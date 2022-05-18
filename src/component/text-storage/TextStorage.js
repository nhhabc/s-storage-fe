import './TextStorage.js';
import './TextStorage.scss';
import {useEffect, useRef, useState} from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../context-menu/ContextMenu";
import {ReactComponent as SendIcon} from "../../assets/send-img.svg";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const URL = 'ws://127.0.0.1:3098/wss';
const client = new W3CWebSocket(URL);
client.onopen = () => {
    console.log('WebSocket Client Connected');
};

client.onclose = () => {
    console.log('WebSocket Client Disconnected');
};

client.onmessage = (message) => {
    console.log(message);
};

function TextStorage() {
    const contextMenuRef = useRef()
    const [user, setUser] = useState('')
    const [messages, setMessages] = useState([]);
    const [msgText, setMsgText] = useState("");

    useEffect(() => {
        httpClient.get('/user').then(res => {
            setUser(res.user.username)
        })
    }, []);

    useEffect(() => {
        httpClient.get('/msg').then(res => {
            setMessages(res.messages)
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
        const message = {user, msgText}
        client.send(JSON.stringify(message))


        setMsgText("");

        // Save to server
        httpClient.post('/msg', {
            msg: msgText,
        })
            .then(function (response) {
                setMessages(msg => [...msg, response.message])
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
                .then()
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
