
import './main_button.css';

const MainButton = ({ answer, handleClick, style, index }: { answer: string, handleClick: (event: React.MouseEvent, answer: string) => void, style: string, index: number }) => {

    return (
        <span className='main_button' style={{ backgroundColor: style === "correct" ? "green" : style === "incorrect" ? "red" : "" }}
            onClick={(event) => handleClick(event, answer)}>{answer}</span>
    )
}


export default MainButton;