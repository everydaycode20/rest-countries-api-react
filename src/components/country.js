import  React, {useEffect, useState, useContext, useRef, useReducer} from "react";
import "../styles/country_card.scss";
import {DarkModeContext} from "./utils/context";
import {Link} from "react-router-dom";
import LoadingWorld from "../images/loading_world.gif";

function Country({search, setSearch, filterRegion}) {

    const {darkMode} = useContext(DarkModeContext);

    const [countries, setCountries] = useState([]);

    const [showCountries, setShowCountries] = useState([]);
console.log("test");
    const refLastElm = useRef(null);

    const refContainer = useRef(null);

    const initialState = {blockScroll: false, initialPos: 0, update: true, scrollDistance: "", isLoading: true};

    function reducer(state, action) {
        switch (action.type) {
            case "blockScroll":
                return {...state, blockScroll: false}
            case "blockScrollTrue":
                return {...state, blockScroll: true};
            case "initialPos":
                return {...state, initialPos: state.initialPos + 10}
            case "restartPos":
                return {...state, initialPos: state.initialPos = 0};
            case "update":
                return {...state, update: state.update + Date.now()};
            case "scrollDistance":
                return {...state, scrollDistance: state.scrollDistance + Date.now()};
            case "isLoading":
                return {...state, isLoading: false};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function fetchCountries() {
        fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(country =>{
            country.forEach(elm => {
                console.log(elm);
            })
            setCountries(country);
            
        }).catch(err => console.log(err));
    }

    function loadCountries() {
        if (state.initialPos !== countries.length && state.blockScroll === false) {
            for (let i = state.initialPos; i < state.initialPos + 10; i++){
                setShowCountries(elm => [...elm, countries[i]]);
            }
            dispatch({type: "scrollDistance"});
        }
        else if(state.blockScroll === true && filterRegion !== "All"){
            for (let i = state.initialPos; i < state.initialPos + 10; i++){
                setShowCountries(countries.filter(country => country.region.includes(filterRegion)));
            }
        }dispatch({type: "isLoading"});
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        countries.length !== 0 && loadCountries();
        
    }, [countries, state.update])

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        }
        let target = refLastElm.current;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    if (state.blockScroll === false) {
                        dispatch({type: "initialPos"});
                        dispatch({type: "update"});
                    }
                }
            });
        }, options);


        target && observer.observe(target);

        return () => {
            target && observer.unobserve(target);
        }
    }, [state.scrollDistance]);

    useEffect(() => {
        
        if (filterRegion !== "" && search === "") {

            if (filterRegion === "All") {
                dispatch({type: "restartPos"});
                dispatch({type: "blockScroll"});
                setShowCountries([]);
                dispatch({type: "update"});
            }
            else{
                dispatch({type: "blockScrollTrue"});
                setShowCountries(countries.filter(country => country.region.includes(filterRegion)));
            }
        }
        else{
            setShowCountries(countries.filter(country => country.name.toLowerCase().includes(search)));

            if (search === "") {
                setShowCountries([]);
                dispatch({type: "restartPos"});
                dispatch({type: "blockScroll"});
                dispatch({type: "update"});
            }
        }

    }, [search, filterRegion]);

    function resetSearch() {
        setSearch("");
    }

    return (
        <>
        {state.isLoading ? <img src={LoadingWorld} alt="" /> :
            <section className="countries-container" cssstyle={darkMode.toString()} ref={refContainer}>
                {showCountries.map((country, id) => {
                    let pop = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return (
                        // gets ref only when it's the last item
                        <Link to={`/${country.name.common}`} key={id} className="country-card" ref={id === showCountries.length-1 ? refLastElm : null} onClick={() => resetSearch()}>
                            <img src={country.flags.svg} alt={country.name.common}/>
                            <div className="country-info">
                                <p>{country.name.common}</p>
                                <p>Population: <span>{pop}</span></p>
                                <p>Region: <span>{country.region}</span></p>
                                <p>Capital: <span>{country.capital}</span></p>
                            </div>
                        </Link>
                    )
                })}
            </section>
        }
        </>
    );

}

export default Country;