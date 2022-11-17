import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import MainButton from '../main_button/MainButton';
import { nanoid } from 'nanoid';
import './main_buttons_container.css'

const MainButtonsContainer = ({ handleCorrect, handleIncorrect, answers, correctAnswer, setTimeOut }:
    {
        handleCorrect: Dispatch<SetStateAction<number>>,
        handleIncorrect: Dispatch<SetStateAction<number>>,
        answers: string[],
        correctAnswer: string | undefined,
        setTimeOut: Dispatch<React.SetStateAction<boolean>>
    }) => {

    const [style, setStyle] = useState(["", "", "", ""]);

    useEffect(() => {
        return setStyle(["", "", "", ""]);
    }, [answers])

    const handleMainButtonClick = (event: React.MouseEvent, answer: string) => {
        const index = answers.indexOf(answer);

        if (answer === correctAnswer) {

            handleCorrect(prev => prev + 1);
            setStyle(prev => [...prev].map((el, ind) => ind === index ? "correct" : el));
            setTimeOut(prev => !prev)

        } else {
            handleIncorrect(prev => prev + 1);
            setStyle(prev => [...prev].map((el, ind) => ind === index ? "incorrect" : el))

            setTimeOut(prev => !prev)
        }
    }

    return (
        <div id="#main_buttons_container">
            {answers.map((answer, index) => <MainButton answer={answer} key={nanoid()} handleClick={handleMainButtonClick} style={style[index]} index={index} />)}
        </div>
    )
}

export default MainButtonsContainer;