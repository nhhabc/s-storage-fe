import {ReactComponent as SearchIco} from "../assets/search-ico.svg";
import './SearchBar.scss'
import {useDispatch} from "react-redux";
import {storageAction} from "../store/storage-slice";
import FolderApi from "../api/FolderApi";
import {useParams} from "react-router-dom";
import FileApi from "../api/FileApi";

const SearchBar = () => {
    const params = useParams()
    const folderId = params.folderId;
    const dispatch = useDispatch()

    const onSearching = (e) => {
        if (!e.target.value) {
            if (folderId) {
                FolderApi.getChildrenFolder(folderId).then(res => {
                    dispatch(storageAction.getAllFolder(res.folder))
                })
                FileApi.getChildrenFile(folderId)
                    .then(res => {
                        dispatch(storageAction.getAllFile(res.file))
                    });
            } else {
                FolderApi.getRootFolder().then(res => {
                    dispatch(storageAction.getAllFolder(res.folder))
                });
                FileApi.getRootFile().then(res => {
                    dispatch(storageAction.getAllFile(res.file))
                })
            }
        }
        dispatch(storageAction.onSearchChange(e.target.value))
    }

    return (
        <div className='search'>
            <SearchIco className='search__icon'></SearchIco>
            <input type="text" placeholder='Search...' className='search__input' onChange={onSearching}/>
        </div>
    )
}

export default SearchBar;