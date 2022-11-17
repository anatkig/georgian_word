import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './modal_box.css';
import createRandomWordAndAnswers from '../../logic/modal_box_logic';
import randomIndexGenerator from '../../logic/random_index_generator';
import { ReceivedArray } from '../types/types';
import MainButtonsContainer from '../main_buttons_container/MainButtonsContainer';


const ModalBox = ({ handleCorrect, handleIncorrect }: { handleCorrect: Dispatch<SetStateAction<number>>, handleIncorrect: Dispatch<SetStateAction<number>> }) => {

    const [allWords, setAllWords] = useState<ReceivedArray[]>();
    const [word, setWord] = useState<string>();
    const [correctAnswer, setCorrectAnswer] = useState<string>();
    const [answers, setAnswers] = useState<string[]>([]);
    const [randomIndex, setRandomIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [operationalArray, setOperationalArray] = useState<ReceivedArray[]>();
    const [timeOut, setTimeOut] = useState(false);

    useEffect(() => {
        const wordArrayRaw = localStorage.getItem("georgianWords");
        if (wordArrayRaw) {
            setAllWords(JSON.parse(wordArrayRaw))
        }
    }, [trigger])

    useEffect(() => {
        if (operationalArray) {
            setRandomIndex(
                randomIndexGenerator(operationalArray)
            );
        }
    }, [operationalArray])

    useEffect(() => {
        if (operationalArray) {
            const [word, correctAnswer, answers] = createRandomWordAndAnswers(operationalArray, randomIndex);

            setWord(word);
            setCorrectAnswer(correctAnswer);
            setAnswers(answers);
        }
    }, [operationalArray, randomIndex])

    useEffect(() => {

        setCurrentIndex(Number(localStorage.getItem("currentIndex")));

    }, [trigger])

    useEffect(() => {
        if (allWords && currentIndex) {
            setOperationalArray(allWords.slice(0, currentIndex));
        }

    }, [allWords, currentIndex]);

    useEffect(() => {
        setTimeout(() => { setTrigger(prev => !prev) }, 1000)

    }, [timeOut])

    const handleDelete = (event: React.MouseEvent) => {
        if (allWords) {
            alert("Are you sure you want to delete this?");

            const words = [...allWords];
            words.splice(randomIndex, 1);
            localStorage.setItem("georgianWords", JSON.stringify(words))


            setTrigger(!trigger);
        }
    }
    const handleNext = (event: React.MouseEvent) => {
        setTrigger(!trigger);
    }

    return (
        <div id="modal_box">
            <div id="word">{word}</div>
            <MainButtonsContainer {...{ handleCorrect, handleIncorrect, answers, correctAnswer, setTimeOut }} />
            <button id="delete_button" onClick={(event) => handleDelete(event)}> Delete the random Word</button>
            <button id='next' onClick={handleNext}>Next=&gt;</button>
        </div>
    )
}

export default ModalBox;