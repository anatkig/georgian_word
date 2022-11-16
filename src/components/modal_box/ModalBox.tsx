import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './modal_box.css';
import MainButton from '../main_button/MainButton';
import axios from 'axios';
import createRandomWordAndAnswers from '../../logic/modal_box_logic';
import randomIndexGenerator from '../../logic/random_index_generator';
import { ReceivedArray } from '../types/types';


const ModalBox = ({ handleCorrect, handleIncorrect }: { handleCorrect: Dispatch<SetStateAction<number>>, handleIncorrect: Dispatch<SetStateAction<number>> }) => {

    const [allWords, setAllWords] = useState<ReceivedArray[]>();
    const [word, setWord] = useState<string>();
    const [correctAnswer, setCorrectAnswer] = useState<string>();
    const [answers, setAnswers] = useState<string[]>([]);
    const [randomIndex, setRandomIndex] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [randomLang, setRandomLang] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3002/words').then(response => setAllWords(response.data));
    }, [trigger])

    useEffect(() => {
        if (allWords) {
            setRandomIndex(
                randomIndexGenerator(allWords)
            );
        }
    }, [allWords])

    useEffect(() => {
        if (allWords) {
            const [word, correctAnswer, answers] = createRandomWordAndAnswers(allWords, randomIndex);

            setRandomLang(randomLang);

            setWord(word);
            setCorrectAnswer(correctAnswer);
            setAnswers(answers);
        }
    }, [allWords, randomIndex])

    useEffect(() => {
        const index = { currentIndex: randomIndex }
        axios.post('http://localhost:3002/index', { index })
    }, [randomIndex])

    const handleDelete = (event: React.MouseEvent) => {
        if (allWords) {
            alert("Are you sure you want to delete this?");
            const deleteKey = allWords[randomIndex].id;
            axios.delete(`http://localhost:3002/words/${deleteKey}`);
            setTrigger(!trigger);
        }
    }
    const handleNext = (event: React.MouseEvent) => {
        setTrigger(!trigger);
    }

    const handleMainButtonClick = (event: React.MouseEvent, answer: string) => {
        if (answer === correctAnswer) {
            handleCorrect(prev => prev + 1);
            setTrigger(!trigger);
        } else {
            handleIncorrect(prev => prev + 1);

            setTrigger(!trigger);
        }
    }

    return (
        <div id="modal_box">
            <div id="word">{word}</div>
            <div id="button_container">
                {answers.map(answer => <MainButton answer={answer} key={answer} handleClick={handleMainButtonClick} />)}
            </div>
            <button id="delete_button" onClick={(event) => handleDelete(event)}> Delete the Current Word</button>
            <button id='next' onClick={handleNext}>Next=&gt;</button>
        </div>
    )
}

export default ModalBox;