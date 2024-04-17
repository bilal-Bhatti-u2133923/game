import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming a separate CSS file named App.css

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const Questions = [
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: 'What is the tallest mountain in the world?', answer: 'mount everest' },
    { question: 'What is 2 + 2?', answer: '4' },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Questions.length);
    const selectedQuestion = Questions[randomIndex];
    setQuestion(selectedQuestion.question);
    setAnswer(selectedQuestion.answer.toLowerCase());
  }, []);

  const handleCellClick = (index) => {
    if (board[index] === null && isQuestionCorrect) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      checkWinner(newBoard);

      // Update question and answer for next turn
      const randomIndex = Math.floor(Math.random() * Questions.length);
      const selectedQuestion = Questions[randomIndex];
      setQuestion(selectedQuestion.question);
      setAnswer(selectedQuestion.answer.toLowerCase());
      setIsQuestionCorrect(false); // Reset question state after each turn

      // Check for winner or draw
      const winner = checkWinner(board);
      if (winner) {
        console.log(`Winner: ${winner}`);
      }
    }
  };

  const checkWinner = (board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning player symbol
      }
    }

    // Check for a draw (all cells filled)
    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }

    return null; // No winner yet
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

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsQuestionCorrect(false);

    // Reset question and answer
    const randomIndex = Math.floor(Math.random() * Questions.length);
    const selectedQuestion = Questions[randomIndex];
    setQuestion(selectedQuestion.question);
    setAnswer(selectedQuestion.answer.toLowerCase());
  };

  const renderBoard = () => {
    return board.map((cell, index) => (
      <button key={index} className="board-button" onClick={() => handleCellClick(index)}>
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
          {isQuestionCorrect ? null : ( // Only show form if question not answered correctly
            <form onSubmit={handleAnswerSubmit}>
              <input type="text" name="answer" placeholder="Enter your answer" />
              <button type="submit">Answer</button>
            </form>
          )}
        </div>
      </div>
      <p>Current Player: {currentPlayer}</p>
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
}

export default App;
