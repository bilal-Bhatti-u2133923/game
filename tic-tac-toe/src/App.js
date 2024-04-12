import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables for the game board, current player, question status, and question/answer
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); // Added answer state for actual answer

  // Example questions and answers (replace with your actual API response format)
  const exampleQuestions = [
    { question: 'What is the capital of France?', answer: 'paris' },
    { question: 'What is the tallest mountain in the world?', answer: 'mount everest' },
    { question: 'What is 2 + 2?', answer: '4' },
  ];

  // Randomly select a question from the example list on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exampleQuestions.length);
    const selectedQuestion = exampleQuestions[randomIndex];
    setQuestion(selectedQuestion.question);
    setAnswer(selectedQuestion.answer.toLowerCase()); // Store answer in lowercase
  }, []);

  // Handle a click on a Tic Tac Toe cell
  const handleCellClick = (index) => {
    // Check if the cell is empty and the question was answered correctly
    if (board[index] === null && isQuestionCorrect) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setIsQuestionCorrect(false); // Reset question state for next turn
    }
  };

  // Handle form submission for answering the question
  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const userAnswer = event.target.answer.value.toLowerCase();

    // Check if the user's answer matches the correct answer (case-insensitive)
    if (userAnswer === answer) {
      setIsQuestionCorrect(true);
    } else {
      alert('Incorrect answer! Try again.');
    }
  };

  // Render the Tic Tac Toe board based on the current state
  const renderBoard = () => {
    return board.map((cell, index) => (
      <button key={index} onClick={() => handleCellClick(index)}>
        {cell}
      </button>
    ));
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        {renderBoard()}
      </div>
      <div className="question-container">
        {/* Only display the question if it hasn't been answered correctly yet */}
        {isQuestionCorrect ? null : (
          <form onSubmit={handleAnswerSubmit}>
            <h2>Question:</h2>
            <p>{question}</p>
            <input type="text" name="answer" placeholder="Enter your answer" />
            <button type="submit">Answer</button>
          </form>
        )}
      </div>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
}

export default App;
