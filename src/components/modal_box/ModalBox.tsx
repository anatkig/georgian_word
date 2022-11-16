import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './modal_box.css';
import MainButton from '../main_button/MainButton';
import createRandomWordAndAnswers from '../../logic/modal_box_logic';
import randomIndexGenerator from '../../logic/random_index_generator';
import { ReceivedArray } from '../types/types';


const ModalBox = ({ handleCorrect, handleIncorrect }: { handleCorrect: Dispatch<SetStateAction<number>>, handleIncorrect: Dispatch<SetStateAction<number>> }) => {

    const [allWords, setAllWords] = useState<ReceivedArray[]>();
    const [word, setWord] = useState<string>();
    const [correctAnswer, setCorrectAnswer] = useState<string>();
    const [answers, setAnswers] = useState<string[]>([]);
    const [randomIndex, setRandomIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [operationalArray, setOperationalArray] = useState<ReceivedArray[]>();

    useEffect(() => {

        setAllWords(JSON.parse(localStorage.getItem("georgianWords") || "{}"))

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

    const handleMainButtonClick = (event: React.MouseEvent, answer: string) => {
        if (answer === correctAnswer) {
            handleCorrect(prev => prev + 1);
            event.currentTarget.classList.add('correct');
            setTimeout(() => {
                event.currentTarget.classList.remove('correct');
                setTrigger(!trigger);

            }, 1000)

        } else {
            handleIncorrect(prev => prev + 1);
            event.currentTarget.classList.add('incorrect');

            setTimeout(() => {
                event.currentTarget.classList.remove('incorrect');
                setTrigger(!trigger)
            }, 1000)
        }
    }

    return (
        <div id="modal_box">
            <div id="word">{word}</div>
            <div id="button_container">
                {answers.map(answer => <MainButton answer={answer} key={answer} handleClick={handleMainButtonClick} />)}
            </div>
            <button id="delete_button" onClick={(event) => handleDelete(event)}> Delete the random Word</button>
            <button id='next' onClick={handleNext}>Next=&gt;</button>
        </div>
    )
}

export default ModalBox;