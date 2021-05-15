import React, {useEffect, useState, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import "../styles/country_info.scss";
import ArrowBackBlack from "../images/arrow_back_black.svg";
import ArrowBackWhite from "../images/arrow_back_white.svg";
import {DarkModeContext} from "../components/utils/context";
import LoadingWorld from "../images/loading_world.gif";

function CountryInfo() {
    
    const {country} = useParams();
    
    const [countryInfo, setCountryInfo] = useState([]);

    const {darkMode} = useContext(DarkModeContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => {
            setIsLoading(true);
            return res.json();
        }).then(result => {
            if (result[0].borders.length === 0) {
                setIsLoading(false);
                setCountryInfo(result);
            }
            else{
                const newList = result[0].borders.map(b => getBorderCountries(b));
                
                Promise.all(newList).then(values => {
                    
                    values.forEach((v,i) =>  {
                        if (result[0].borders[i] !== v) {
                            result[0].borders.splice(result[0].borders.indexOf(i),1);
                            result[0].borders.unshift(v);
                        }
                    });
                    setIsLoading(false);
                    setCountryInfo(result);
                });
            }
            
        }); 
    }, []);

    async function getBorderCountries(c) {
        const country = await fetch(`https://restcountries.eu/rest/v2/alpha/${c}`).then(a => a.json()).then(brd => {return brd.name});

        return country;
    }

    return (
        <>
        {isLoading ? <img src={LoadingWorld} alt="loading" className="loading-icon"/> :
            <main className="country-info-main-container" cssstyle={darkMode.toString()}>
                <div className="btn-container">
                    <button type="button"><Link to="/"><img src={darkMode ? ArrowBackWhite : ArrowBackBlack} alt="arrow back"/> Back</Link></button>
                </div>
                {countryInfo && countryInfo.map(info => {
                    let languages = "";
                    info.languages.map(l => languages += l.name + " ");
                    
                    return (
                        <section className="country-info-container" key={info.name}>
                            <img src={info.flag} alt={info.name} className="flag"/>
                            <section className="info">
                                <h2>{info.name}</h2>
                                <div className="geo-info">
                                    <p>Native Name: <span>{info.nativeName}</span></p>
                                    <p>Region: <span>{info.region}</span></p>
                                    <p>Sub Region: <span>{info.subregion}</span></p>
                                    <p>Sub Capital: <span>{info.capital}</span></p>
                                </div>
                                <div className="econ-info">
                                    <p>Top Level Domain: <span>{info.topLevelDomain[0]}</span></p>
                                    <p>Currencies: <span>{info.currencies[0].name}</span></p>
                                    <p>Languages: <span>{languages}</span></p>
                                </div>
                                <div className="border-countries">
                                    <h3>Border Countries</h3>
                                    <div className="list-border-countries">
                                        {info.borders.map((border, i)=> {
                                            return (
                                                <p className="border-name" key={i}>{border}</p>
                                            )
                                        })}
                                    </div>
                                    
                                </div>
                            </section>
                        </section>
                    )
                })}
                
            </main>
            }
        </>
    )
}

export default CountryInfo;