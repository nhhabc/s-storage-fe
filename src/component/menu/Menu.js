import './Menu.js';
import './Menu.scss';

const menuItems = [
    {
        img: require('../../assets/text-logo.png'),
        title: "Text"
    },
    {
        img: require('../../assets/text-logo.png'),
        title: "Text"
    },
    {
        img: require('../../assets/text-logo.png'),
        title: "Text"
    },
    {
        img: require('../../assets/text-logo.png'),
        title: "Text"
    },
    {
        img: require('../../assets/text-logo.png'),
        title: "Text"
    },
]

function Menu() {
    return (
        <div className="menu">
            {menuItems.map((item , index) => {
                return (
                    <div className="menu-item" key={index}>
                        <div className="menu-image">
                            <img src={item.img} alt="#"/>
                        </div>
                        <div className="menu-title">
                            {item.title}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Menu;
