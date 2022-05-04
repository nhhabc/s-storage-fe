import './Menu.js';
import './Menu.scss';
import {ContextMenu} from "../context-menu/context-menu";

const CustomMenu = () => {
    return (
        <ul className="context-menu">
            <li>Download</li>
            <li>Delete</li>
        </ul>
    );
}

function Menu(props) {
    return (
        <div className="menu">
            <p className="title">All files:</p>
            {props.listItems.map((item, index) => {
                return (
                    <ContextMenu menu={<CustomMenu />}>
                        <div className="menu-item" key={index}>
                            <div className="menu-image">
                                <img src={item.img} alt={item.name}/>
                            </div>
                            <div className="menu-title">
                                {item.name}
                            </div>
                        </div>
                    </ContextMenu>
                )
            })}

        </div>
    );
}

export default Menu;
