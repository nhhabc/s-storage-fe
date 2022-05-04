import {useCallback, useEffect, useState} from "react";

export const useContextMenu = (itemEl) => {
    const [xPos, setXPos] = useState("0px");
    const [yPos, setYPos] = useState("0px");
    const [showMenu, setShowMenu] = useState(false);

    const handleContextMenu = useCallback(
        (e) => {
            e.preventDefault();

            setXPos(`${e.pageX}px`);
            setYPos(`${e.pageY}px`);
            setShowMenu(true);
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
        document.addEventListener("click", toggleMenu);
        itemEl.current.addEventListener("click", handleClick);
        itemEl.current.addEventListener("contextmenu", handleContextMenu);
        return () => {
            itemEl.current.addEventListener("click", handleClick);
            itemEl.current.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", toggleMenu);
        };
    },[]);

    return {xPos, yPos, showMenu};
};