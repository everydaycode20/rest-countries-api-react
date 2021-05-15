import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./styles/body.scss";
import {DarkModeContext} from "./components/utils/context";

function Main() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
        <main cssstyle={darkMode.toString()} className="super-main-container">
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </main>
      </DarkModeContext.Provider>
    </>
  )
}

ReactDOM.render(
      <Main/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
