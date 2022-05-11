import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import './ContextMenu.scss'

export const ContextMenu = forwardRef((props, ref) => {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [isShow, setShowMenu] = useState(false);
    const [menuEl, setMenuEl] = useState(<></>);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();
            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setShowMenu(true);
        },
        [setXPos, setYPos]
    );

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

    const showMenu = (pageX, pageY, data) => {
        setXPos(`${pageX}px`);
        setYPos(`${pageY}px`);
        setShowMenu(true);
    }



    useEffect(() => {
    },);

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