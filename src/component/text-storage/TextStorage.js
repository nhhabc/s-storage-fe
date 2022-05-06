import './TextStorage.js';
import './TextStorage.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import httpClient from "../../api/http-client";

function TextStorage() {

    const [messages, setMessages] = useState([]);
    const [msgText, setMsgText] = useState("");

    useEffect(() => {
        httpClient.get("/msg").then(res => {
            setMessages(res.data.messages)
        })
    }, []);

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

    return (
        <div className="msg-wrapper">
            <div className="msg">
                <div className="msg-box">
                    {
                        messages && messages.length === 0 ? <></> : messages.map((msg, index) => {
                            return (
                                <div className="msg-text" key={index}>
                                    <span className="text">{msg.text}</span>
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
        </div>
    );
}

export default TextStorage;
