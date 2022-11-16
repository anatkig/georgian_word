import React, { useState } from 'react';
import ModalBox from './components/modal_box/ModalBox';
import MenuBox from './components/menu_box/MenuBox';
import './App.css';
import { createJSDocProtectedTag } from 'typescript';

function App() {
  const [correct, handleCorrect] = useState(0);
  const [incorrect, handleIncorrect] = useState(0);


  return (
    <div className="App">
      <MenuBox correct={correct} incorrect={incorrect} />
      <ModalBox handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />
    </div>
  );
}

export default App;
