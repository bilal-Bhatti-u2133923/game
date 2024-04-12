import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables for the game board, current player, question status, and question/answer
  const [board, setBoard] = useState(Array(9).fill(null)); // Array to represent the Tic Tac Toe board
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Current player (X or O)
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false); // Flag indicating if the current question was answered correctly
  const [question, setQuestion] = useState(''); // The current trivia question
  const [answer, setAnswer] = useState(''); // The correct answer to the current question

  // Fetch a question from an API endpoint when the component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('https://your-question-api.com/api/question'); // Replace with your question API endpoint
      const data = await response.json();
      setQuestion(data.question);
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error fetching question:', error); // Handle potential errors during question fetching
    }
  };

  // Handle a click on a Tic Tac Toe cell
  const handleCellClick = (index) => {
    // Check if the cell is empty and the question was answered correctly
    if (board[index] === null && isQuestionCorrect) {
      const newBoard = [...board]; // Create a copy of the board state
      newBoard[index] = currentPlayer; // Update the clicked cell with the current player's mark
      setBoard(newBoard); // Update the board state
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Switch current player
      setIsQuestionCorrect(false); // Reset question state for next turn
    }
  };

  // Handle form submission for answering the question
  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const userAnswer = event.target.answer.value.toLowerCase(); // Get user's answer in lowercase

    // Check if the user's answer matches the correct answer (case-insensitive)
    if (answer.toLowerCase() === userAnswer) {
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
