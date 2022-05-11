import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import './ContextMenu.scss'

export const ContextMenu = forwardRef((props, ref) => {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [isShow, setShowMenu] = useState(false);
    const [menuEl, setMenuEl] = useState(<></>);

    useImperativeHandle(ref, () => ({
        showMenu(pageX, pageY, data) {
            setMenuEl(data.menu);
            setXPos(`${pageX}px`);
            setYPos(`${pageY}px`);
            setShowMenu(true);
        },

        hideMenu() {
            setShowMenu(false);
        }
    }));

    return (
        <div className={'context-menu' + " " + (isShow ? "show" : "")}>
            <div
                className="menu-container"
                style={{
                    position: "absolute",
                    top: yPos,
                    left: xPos,
                }}
            >
                {menuEl}
            </div>

        </div>
    );
});