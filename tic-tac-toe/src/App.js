import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const exampleQuestions = [
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: 'What is the tallest mountain in the world?', answer: 'mount everest' },
    { question: 'What is 2 + 2?', answer: '4' },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleQuestions.length);
    const selectedQuestion = exampleQuestions[randomIndex];
    setQuestion(selectedQuestion.question);
    setAnswer(selectedQuestion.answer.toLowerCase());
  }, []);

  const handleCellClick = (index) => {
    if (board[index] === null && isQuestionCorrect) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setIsQuestionCorrect(false);
    }
  };

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const userAnswer = event.target.answer.value.toLowerCase();

    if (userAnswer === answer) {
      setIsQuestionCorrect(true);
    } else {
      alert('Incorrect answer! Try again.');
    }
  };

  const renderBoard = () => {
    return board.map((cell, index) => (
      <button key={index} onClick={() => handleCellClick(index)}>
        {cell}
      </button>
    ));
  };

  return (
    <div className="App">
      <div className="game-container">
        <div className="board-container">
          {renderBoard()}
        </div>
        <div className="question-container">
          <h2>Question:</h2>
          <p>{question}</p>
          {isQuestionCorrect ? null : (
            <form onSubmit={handleAnswerSubmit}>
              <input type="text" name="answer" placeholder="Enter your answer" />
              <button type="submit">Answer</button>
            </form>
          )}
        </div>
      </div>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
}

export default App;
