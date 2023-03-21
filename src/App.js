import React, { useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleChange = (e) => {

    if (e.target.value == '') {
      setBtnDisabled(true)
    } else {
      setInputValue(e.target.value);
      setBtnDisabled(false)

    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://inn.pupaproj.ru/companys", { inn: inputValue })
      // console.log(response.data.value)
      setAnswer(response.data.value)
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="App">
      <h1>ИНН Finder</h1>
      <form onSubmit={e => {
        handleSubmit(e)
      }}>
        <input type="text" onChange={handleChange} required />
        <button onClick={handleSubmit} disabled={btnDisabled}>ПОИСК</button>
      </form>
      <h1>{answer}</h1>
    </div>
  );
}

export default App;
