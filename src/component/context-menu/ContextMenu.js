import {useCallback, useEffect, useRef, useState} from "react";
import './ContextMenu.scss'

export const ContextMenu = ({menu, children, itemId, showId, onShow}) => {
    const menuRef = useRef(null);
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, setShowMenu] = useState(false);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();

            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setShowMenu(true);
            onShow();
        },
        [setXPos, setYPos]
    );

    const handleClick = useCallback(() => {
        showMenu && setShowMenu(false);
    }, [showMenu]);

    const toggleMenu = (e) => {
        setShowMenu(false);
    }

    useEffect(() => {
        if (showId !== itemId) toggleMenu();

        document.addEventListener("click", toggleMenu);
        menuRef.current.addEventListener("click", handleClick);
        menuRef.current.addEventListener("contextmenu", handleContextMenu);
        return () => {
            if (menuRef && menuRef.current) {
                menuRef.current.addEventListener("click", handleClick);
                menuRef.current.addEventListener("focus", toggleMenu);
                menuRef.current.removeEventListener("contextmenu", handleContextMenu);
            }
            document.removeEventListener("click", toggleMenu);
        };
    },[showId]);

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