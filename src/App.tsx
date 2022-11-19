import React, { useState, useEffect } from 'react';
import ModalBox from './components/modal_box/ModalBox';
import MenuBox from './components/menu_box/MenuBox';
import './App.css';
import { setInitialLocalStorageValues } from './logic/local_storage_logic';


function App() {
  const [correct, handleCorrect] = useState(0);
  const [incorrect, handleIncorrect] = useState(0);

  useEffect(() => {

    setInitialLocalStorageValues();


  }, [])

  return (
    <div className="App">
      <MenuBox correct={correct} incorrect={incorrect} handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />
      <ModalBox handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />
    </div>
  );
}

export default App;
