import {ReactComponent as SearchIco} from "../assets/search-ico.svg";
import './SearchBar.scss'
import {useDispatch} from "react-redux";
import {storageAction} from "../store/storage-slice";
import {messageAction} from "../store/message-slice";

const SearchBar = () => {
    const dispatch = useDispatch()

    const onSearching = (e) => {
        dispatch(storageAction.onSearchChange(e.target.value))
        dispatch(messageAction.onSearchChange(e.target.value))
    }

    return (
        <div className='search'>
            <SearchIco className='search__icon'/>
            <input type="text" placeholder='Search...' className='search__input' onChange={onSearching}/>
        </div>
    )
}

export default SearchBar;