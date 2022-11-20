export const shouldUpdateCurrentIndex = (correct: number, incorrect: number, available: number) => {

    if (correct + incorrect >= available) {
        if ((incorrect === 0 && correct > 0) || correct / incorrect >= 3) {
            return true;
        }
    }

    return false;
}

export const updateCurrentIndex = (prevIndex: number) => {

    const keptDataArrRaw = localStorage.getItem("georgianWords");

    if (keptDataArrRaw) {
        const keptDataArr = JSON.parse(keptDataArrRaw);

        const len = keptDataArr.length;

        if (prevIndex + 5 <= len) {
            localStorage.setItem("currentIndex", String(prevIndex + 5));
        }
    }
}

export const updateLevel = (currentLevel: number) => {
    localStorage.setItem("level", String(currentLevel + 1));
}