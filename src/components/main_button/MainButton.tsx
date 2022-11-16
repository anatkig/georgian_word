import './main_button.css';

const MainButton = ({ answer, handleClick }: { answer: string, handleClick: (event: React.MouseEvent, answer: string) => void }) => {
    return (
        <span className="main_button" onClick={(event) => handleClick(event, answer)}>{answer}</span>
    )
}


export default MainButton;