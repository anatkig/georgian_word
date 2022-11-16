const shouldUpdateCurrentIndex = (correct: number, incorrect: number, available: number) => {

    if (correct + incorrect >= available) {
        if ((incorrect === 0 && correct > 0) || correct / incorrect >= 3) {
            return true;
        }
    }

    return false;
}

export default shouldUpdateCurrentIndex;