import './menu_box.css';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import shouldUpdateCurrentIndex from '../../logic/menu_box_logic';


const MenuBox = ({ correct, incorrect, handleCorrect, handleIncorrect }:
    { correct: number, incorrect: number, handleCorrect: Dispatch<SetStateAction<number>>, handleIncorrect: Dispatch<SetStateAction<number>> }) => {

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setinCorrectAnswers] = useState(0);
    const [availableWords, setAvailableWords] = useState(0);
    const [shouldUpdateAvailable, setShouldUpdateAvailable] = useState(false);


    useEffect(() => {
        setCorrectAnswers(correct);
        setinCorrectAnswers(incorrect);

    }, [correct, incorrect])

    useEffect(() => {

        setAvailableWords(Number(localStorage.getItem("currentIndex")) || 0)


    }, [shouldUpdateAvailable])

    useEffect(() => {
        setShouldUpdateAvailable(shouldUpdateCurrentIndex(correct, incorrect, availableWords))
    }, [correct, incorrect, availableWords])

    useEffect(() => {

        if (shouldUpdateAvailable) {
            const index = { currentIndex: availableWords + 5 }
            handleCorrect(0);
            handleIncorrect(0);

            localStorage.setItem("currentIndex", String(availableWords + 5));


            setShouldUpdateAvailable(false);
        }
    }, [shouldUpdateAvailable, availableWords, handleCorrect, handleIncorrect])

    return (
        <div id="menu_box">
            <div id='level'>Your level: {(availableWords / 5) - 1}</div>
            <div className='menu_box--element-container'>
                <div className='menu_box--element'>Correct</div>
                <div className='menu_box--element'>Incorrect</div>
            </div>
            <div className='menu_box--element-container'>
                <div className='menu_box--element'>{correctAnswers}</div>
                <div className='menu_box--element'>{incorrectAnswers}</div>
            </div>
            <div id='available_word'>Available Words: {availableWords}</div>
        </div>
    )
}

export default MenuBox;