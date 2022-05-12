import './TextStorage.js';
import './TextStorage.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useRef, useState} from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../context-menu/ContextMenu";

function TextStorage() {
    const contextMenuRef = useRef()

    const [messages, setMessages] = useState([]);
    const [msgText, setMsgText] = useState("");

    useEffect(() => {
        httpClient.get("/msg").then(res => {
            setMessages(res.data.messages)
        })
    }, []);

    const handleContextMenuClick = (e, data) => {
        e.preventDefault();
        e.stopPropagation()
        contextMenuRef.current.showMenu(e.pageX, e.pageY, data);
    }

    useEffect(() => {
        if (contextMenuRef.current) {
            document.addEventListener("click", () => contextMenuRef.current.hideMenu());
            return () => {
                document.removeEventListener("click", () => contextMenuRef.current.hideMenu());
            };
        }
    })

    const onSent = () => {
        if (msgText.trim().length === 0) return;
        const newMsg = {
            _id: null,
            text: msgText.trim(),
            createdDate: new Date()
        }
        setMsgText("");
        setMessages([...messages, newMsg]);

        // Save to server
        httpClient.post('/msg', {
            msg: msgText,
        })
            .then(function (response) {
                console.log(response);
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

    const CustomMenu = (props) => {

        return (
            <ul className="context-menu-item">
                <li>Delete</li>
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
                                    <span className="text"  onContextMenu={(e) =>
                                        handleContextMenuClick(e, {menu: CustomMenu})}>{msg.text}</span>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="msg-input">
                    <input type="text" className="msg-text-input" value={msgText} onKeyDown={e => handleKeyDown(e)}
                           onChange={e => setMsgText(e.target.value)}/>
                    <div className="msg-send-btn" onClick={onSent}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
            </div>
            <ContextMenu ref={contextMenuRef}/>
        </div>
    );
}

export default TextStorage;
