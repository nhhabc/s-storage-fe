import './TextStorage.js';
import './TextStorage.scss';
import {useEffect, useRef, useState} from "react";
import httpClient from "../../api/http-client";
import {ContextMenu} from "../context-menu/ContextMenu";
import {ReactComponent as SendIcon} from "../../assets/send-img.svg";
import SocketApi, {socket} from "../../api/SocketApi";
import FriendList from "./friend-list/FriendList";
import {useDispatch, useSelector} from "react-redux";
import {messageAction} from "../../store/message-slice";
import {ReactComponent as OnlineStatus} from "../../assets/online-status.svg";
import UserApi from "../../api/UserApi";

function TextStorage() {
    const contextMenuRef = useRef()
    const [user, setUser] = useState('')
    const [msgText, setMsgText] = useState("");
    const dispatch = useDispatch()
    const showMsgState = useSelector(state => state.message.showMsg)
    const receiveFriend = useSelector(state => state.message.sendTo)
    const allMessage = useSelector(state => state.message.messages)
    const listFriend = useSelector(state => state.message.friend)

    useEffect(() => {
        UserApi.getUser().then(res => {
            setUser(res.user.username)
        })
    }, [])

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

        // Save to server
        httpClient.post('/msg', {
            msg: msgText,
            username: user,
            sendTo: receiveFriend._id
        })
            .then(function (response) {
                dispatch(messageAction.createMessage(response.message))
                SocketApi.sendMessage(response.message)
            })
            .catch(function (error) {
                console.log(error);
            });

        setMsgText("")
    }

    useEffect(() => {
        SocketApi.displayMs(({data, from}) => {
            for (let i = 0; i < listFriend.length; i++) {
                const user = listFriend[i];
                if (user._id === from) {
                    dispatch(messageAction.createMessage(data))
                    break;
                }
            }
        })
    },[dispatch, listFriend, socket])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSent();
        }

        if (e.key === 'Escape') {
            dispatch(messageAction.closeMsgHandle(false))
        }
    }

    const deleteTextHandle = (id) => {
        dispatch(messageAction.deleteMessage(id))
    }

    const CustomMenu = (props) => {
        const deleteText = () => {
            httpClient.delete('/msg/' + props.id)
                .then()
            props.onDelete()
        }

        return (
            <ul className="context-menu-item">
                {props.user === user && <li onClick={deleteText}>Delete</li>}
                <li onClick={() => {
                    navigator.clipboard.writeText(props.text)
                }}>Copy
                </li>
            </ul>
        );
    }

    return (
        <div className="msg-wrapper">
            <FriendList/>
            {showMsgState &&
                <div className='msg-container'>
                <div className="msg">
                    <div className='msg-head'>
                        <p className='msg-head__name'>{receiveFriend.username}</p>
                        <OnlineStatus className='msg-head__status'/>
                        <div className='msg-head__close' onClick={() => dispatch(messageAction.closeMsgHandle(false))}>&#x2715;</div>
                    </div>
                    <div className="msg-box">
                        {
                            allMessage.map((msg, index) => {
                                return (
                                    <div className="msg-text" id={`${msg.user !== user && 'right'}`} key={index}
                                         onContextMenu={(e) =>
                                             handleContextMenuClick(e, {
                                                 menu: <CustomMenu onDelete={() => deleteTextHandle(msg._id)}
                                                                   id={msg._id} text={msg.text} user={msg.user}/>
                                             })}>
                                        <div className='msg-text__wrap'>
                                            <p className="msg-text__text">{msg.user}: {msg.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="msg-input">
                        <input type="text" className="msg-input__text" placeholder='Enter a message...' value={msgText}
                               onKeyDown={e => handleKeyDown(e)}
                               onChange={e => setMsgText(e.target.value)}/>
                        <div className="msg-input__send" onClick={onSent}>
                            <SendIcon className="msg-input__send-ico"></SendIcon>
                        </div>
                    </div>
                </div>
                <ContextMenu ref={contextMenuRef}/>
            </div>}
        </div>
    );
}

export default TextStorage;
