import {useContextMenu} from "../hook/useContextMenu";
import {useRef} from "react";
import './ContextMenu.scss'

export const ContextMenu = ({menu, children}) => {
    const menuRef = useRef(null);
    const {xPos, yPos, showMenu} = useContextMenu(menuRef);

    return (
        <div ref={menuRef} className='context-menu'>
            {children}
            {showMenu ? (
                <div
                    className="menu-container"
                    style={{
                        position: "absolute",
                        top: yPos,
                        left: xPos,
                    }}
                >
                    {menu}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};