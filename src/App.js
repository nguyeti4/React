import React, {useRef, useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';

const LOCAL_STORAGE_KEY = 'myLocalStorageKey'; //local storage key can be any string

function App() {
  const [names, setNames] = useState([]);
  const nameInput = useRef();   

  function testfunction(e){
    const name = nameInput.current.value;
    if (name === '') return
    alert("Hello " + name + "!")
    setNames(prevNames => {return [...prevNames, name]}) //prevNames is copy of names array.
    // To change the names array, append name to prevNames

    nameInput.current.value = null;
  }

  useEffect(()=>{
    const storeData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); //retrieve saved data from storage (as string)
    if (storeData) setNames(storeData) //put stored data into names array
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(names)) //set localStorage w/ array data (JSON format)
  },[names])

  return (
    <div>
      <input ref={nameInput} type="text"></input>
      <button onClick={testfunction}>Press Me!</button>
      <HelloWorld names={names} />
    </div>
  );
}

export default App;
