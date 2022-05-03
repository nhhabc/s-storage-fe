import './Menu.js';
import './Menu.scss';

function Menu(props) {
    return (
        <div className="menu">
            {props.listItems.map((item , index) => {
                return (
                    <div className="menu-item" key={index}>
                        <div className="menu-image">
                            <img src={item.img} alt={item.name}/>
                        </div>
                        <div className="menu-title">
                            {item.name}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Menu;
