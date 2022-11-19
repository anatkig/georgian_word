import { ReceivedArray } from "../components/types/types";

const randomIndexGenerator = (array: ReceivedArray[]) => {


    const sortedArr = array.sort((a, b) => b.coof - a.coof);

    const arrOfSame = sortedArr.filter(el => el.coof === sortedArr[0].coof);
    const len = arrOfSame.length;
    const randomIndex = Math.floor(Math.random() * len);
    const randomUnit = arrOfSame[randomIndex];
    const resultIndex = array.indexOf(randomUnit);

    return resultIndex;
}


export default randomIndexGenerator;