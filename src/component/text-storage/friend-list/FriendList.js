import './FriendList.scss'
import SearchBar from "../../../layout/SearchBar";
import {ReactComponent as OnlineStatus} from "../../../assets/online-status.svg";
import {useEffect} from "react";
import UserApi from "../../../api/UserApi";
import {useDispatch, useSelector} from "react-redux";
import {messageAction} from "../../../store/message-slice";
import httpClient from "../../../api/http-client";

const FriendList = () => {
    const listFriends = useSelector(state => state.message.friendFilter)
    const dispatch = useDispatch()


    const showMessage = async (friend) => {
        try {
            const res = await httpClient.get('/msg?user=' + friend._id)
            dispatch(messageAction.getMessages(res.messages))
            dispatch(messageAction.sendToFriend(friend))

            dispatch(messageAction.showMsgHandle(true))
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='friend-list-wrapper'>
            <div className='friend-list'>
                <div className='friend-list__search-bar'>
                    <SearchBar/>
                </div>
                <div className='friend-list__friends'>
                    <p className='friend-list__friends-title'>All friends:</p>
                    <ul className='friend-list__friends-all'>
                        {listFriends.map((friends, index) => {
                            return (
                                <li className='friend-list__friend' key={index} onClick={() => showMessage(friends)}>
                                    <OnlineStatus className='friend-list__friend-status'/>
                                    <p>{friends.username}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FriendList;