import React, {useState, useContext} from "react";
import "../styles/search.scss";
import SearchIconGrey from "../images/search_icon_grey.svg";
import DropDownArrowBlack from "../images/arrow_drop_down_black.svg";
import DropDownArrowWhite from "../images/arrow_drop_down_white.svg";
import {DarkModeContext} from "./utils/context";

function Search({setSearch, setFilterRegion}) {
    
    const [dropdown, setDropdown] = useState(false);

    const {darkMode} = useContext(DarkModeContext);

    function showDropdown() {
        setDropdown(true);

        if (dropdown === true) {
            setDropdown(false);
        }
    }

    function search(e) {
        setSearch(e.target.value);
    }

    function filterRegion(e) {
        setFilterRegion(e.target.textContent)
        setDropdown(false);
    }

    return (
        <>
            <section className="search-container" cssstyle={darkMode.toString()}>
                <form>
                    <img src={SearchIconGrey} alt="search icon"/>
                    <input type="text" id="input" placeholder="Search for a country" onChange={e => search(e)}/>
                </form>
                <section className="filter-container">
                    <button type="button" onClick={() => showDropdown()}>Filter by Region <img src={darkMode ? DropDownArrowWhite : DropDownArrowBlack} alt="drop down arrow"/> </button>
                    {dropdown && <section className="dropdown">
                        <ul>
                            <li onClick={e => filterRegion(e)}>Africa</li>
                            <li onClick={e => filterRegion(e)}>America</li>
                            <li onClick={e => filterRegion(e)}>Asia</li>
                            <li onClick={e => filterRegion(e)}>Europe</li>
                            <li onClick={e => filterRegion(e)}>Oceania</li>
                            <li onClick={e => filterRegion(e)}>All</li>
                        </ul>
                    </section>}
                </section>
            </section>
        </>
    );

}

export default Search;