import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from './logo.svg';
import './App.css';


export default function App() {

  const [data, setData] = useState({}); // Declare 'data' in your component's state
  const handleClick = (buttonName) => {
    console.log(buttonName);
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div data-testid="button-test">
        <button  onClick={() => handleClick("TV Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            TV
       </button>

      </div>
    </div>
  );
}




