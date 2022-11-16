import './menu_box.css';
import { useState, useEffect } from 'react';




const MenuBox = ({ correct, incorrect }: { correct: number, incorrect: number }) => {

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setinCorrectAnswers] = useState(0);

    useEffect(() => {
        setCorrectAnswers(correct);
        setinCorrectAnswers(incorrect);

    }, [correct, incorrect])


    return (
        <div id="menu_box">
            <div className='menu_box--element-container'>
                <div className='menu_box--element'>Correct</div>
                <div className='menu_box--element'>Incorrect</div>
            </div>
            <div className='menu_box--element-container'>
                <div className='menu_box--element'>{correctAnswers}</div>
                <div className='menu_box--element'>{incorrectAnswers}</div>
            </div>
        </div>
    )
}

export default MenuBox;