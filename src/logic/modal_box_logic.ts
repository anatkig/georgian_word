import shuffle from "./array_shuffle";
import { ReceivedArray } from "../components/types/types";

const createRandomWordAndAnswers = (array: ReceivedArray[], randomIndex: number) => {

    const randomLang = Math.floor(Math.random() * 2);

    const currentUnit = array[randomIndex];

    const wordLang = randomLang === 0 ? 'ru' : 'gu';
    const correctAnsLang = randomLang === 0 ? 'gu' : 'ru';

    const word = currentUnit[wordLang];
    const correctAnswer = currentUnit[correctAnsLang];

    const arrayWithoutTheWord: ReceivedArray[] = array.filter((unit, index) => index !== randomIndex);
    const shuffledArrayWithoutTheWord = shuffle(arrayWithoutTheWord);
    const incorrectAnswersRaw = shuffledArrayWithoutTheWord.slice(0, 3);
    const incorrectAnswers = incorrectAnswersRaw.map(unit => unit[correctAnsLang]);
    const answers = shuffle([correctAnswer, ...incorrectAnswers]);
    const result: [string, string, string[]] = [word, correctAnswer, [...answers]];


    return result;

}

export default createRandomWordAndAnswers;