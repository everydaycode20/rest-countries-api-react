import React, {useContext} from "react";
import "../styles/navbar.scss";
import DarkModeBlack from "../images/dark_mode_black.svg";
import DarkModeWhite from "../images/dark_mode_white.svg";
import {DarkModeContext} from "./utils/context";

function NavBar() {
    
    const {darkMode, setDarkMode} = useContext(DarkModeContext);
    
    function toggleDarkMode() {
        setDarkMode(true);
        
        if (darkMode === true) {
            setDarkMode(false);
        }
    }

    return (
        <>
            <nav cssstyle={darkMode.toString()}>
                <section className="nav-container" >
                    <h1>Where in the world?</h1>
                    <div className="dark-mode-container">
                        <img src={darkMode ? DarkModeWhite : DarkModeBlack} alt="dark mode"/>
                        <button type="button" onClick={() => toggleDarkMode()}>DarkMode</button>
                    </div>
                </section>
            </nav>
        </>
    );

}

export default NavBar;