import { ReceivedArray } from "../components/types/types";

const randomIndexGenerator = (obj: ReceivedArray[]) => {
    const arrayOfKeys = Object.keys(obj);
    const len = arrayOfKeys.length;
    const randomIndex = Math.floor(Math.random() * len);

    return randomIndex;
}


export default randomIndexGenerator;