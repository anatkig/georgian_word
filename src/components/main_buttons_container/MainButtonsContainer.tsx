import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './main_buttons_container.css'
import MainButton from '../main_button/MainButton';


const MainButtonsContainer = ({ handleCorrect, handleIncorrect, answers, correctAnswer, setTimeOut }:
    {
        handleCorrect: Dispatch<SetStateAction<number>>,
        handleIncorrect: Dispatch<SetStateAction<number>>,
        answers: string[],
        correctAnswer: string | undefined,
        setTimeOut: Dispatch<React.SetStateAction<boolean>>
    }) => {


    const handleMainButtonClick = (event: React.MouseEvent, answer: string) => {
        const element = event.currentTarget;
        if (answer === correctAnswer) {

            handleCorrect(prev => prev + 1);
            element.classList.add('correct');
            setTimeOut(prev => !prev)

        } else {
            handleIncorrect(prev => prev + 1);
            element.classList.add('incorrect');

            setTimeOut(prev => !prev)
        }
    }
    console.log(answers)
    return (
        <div id="#main_buttons_container">
            {answers.map(answer => <MainButton answer={answer} key={answer} handleClick={handleMainButtonClick} />)}
        </div>
    )
}

export default MainButtonsContainer;