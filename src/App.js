import React, {useState} from "react";
import Country from "./components/country";
import NavBar from "./components/navbar";
import Search from "./components/search";
import "./styles/main.scss";
import {DarkModeContext} from "./components/utils/context";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CountryInfo from "./components/country_info";

function App() {

  const [search, setSearch] = useState("");

  const [filterRegion, setFilterRegion] = useState("");

  return (
    <>
    <Router>
      <NavBar/>
      <Switch>
      <Route exact path="/">
        {/* <DarkModeContext.Provider value={{darkMode, setDarkMode}}> */}
          {/* <main cssstyle={darkMode.toString()}> */}
            
            <section className="main-container">
              <Search setSearch={setSearch} setFilterRegion={setFilterRegion}/>
              <Country search={search} setSearch={setSearch} filterRegion={filterRegion}/>
            </section>
          {/* </main> */}
        {/* </DarkModeContext.Provider> */}
      </Route>
      <Route path="/:country" children={<CountryInfo/>}></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
