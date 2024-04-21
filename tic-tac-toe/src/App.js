import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [playState, setplay] = useState(false); // true means that the game is playing. false means the game is over 

  const Questions = [ //questions and ansers 
    { question: 'What is the capital of France?', answer: 'paris' },
    //{ question: 'What is the tallest mountain in the world?', answer: 'mount everest' },
    //{ question: 'What is 2 + 2?', answer: '4' },
  ];//remove ^

  useEffect(() => { //sets next question and the anser
    const randomIndex = Math.floor(Math.random() * Questions.length);
    const selectedQuestion = Questions[randomIndex];
    setQuestion(selectedQuestion.question);
    setAnswer(selectedQuestion.answer.toLowerCase());
  }, []);



  const handleCellClick = (index) => {  //makes sure the square is empty and the anser is corect
    if (board[index] === null && isQuestionCorrect) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      checkWinner(newBoard);

      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

      // Update question and answer for next turn
      const randomIndex = Math.floor(Math.random() * Questions.length);
      const selectedQuestion = Questions[randomIndex];
      setQuestion(selectedQuestion.question);
      setAnswer(selectedQuestion.answer.toLowerCase());
      setIsQuestionCorrect(false); // Reset question state after each turn

      // Check for winner or draw
      
    
      }
    };

  const checkWinner = (board) => { //checks the winning slots and checks if they are fufilled yet
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
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
          setplay(false);
      }
    }

    if (board.every((cell) => cell !== null)) {
      console.log(`Draw`);
    }
  };

  const handleAnswerSubmit = (event) => {  //sets users anser to lower case and tests it 
    event.preventDefault();
    const userAnswer = event.target.answer.value.toLowerCase();

    if (userAnswer === answer) {
      setIsQuestionCorrect(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      document.getElementById("answerField").value = "";
      let player = currentPlayer;
      alert('Incorrect answer! '+ player +'s turn is over');
    }
  };

  const handleRestart = () => { //restarts the game 
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsQuestionCorrect(false);
    setplay(true);

    // Reset question and answer
    const randomIndex = Math.floor(Math.random() * Questions.length);
    const selectedQuestion = Questions[randomIndex];
    setQuestion(selectedQuestion.question);
    setAnswer(selectedQuestion.answer.toLowerCase());
  };

  const renderBoard = () => { //sets the board
    return board.map((cell, index) => (
      <button key={index} className="board-button" onClick={() => handleCellClick(index)}>
        {cell}
      </button>
    ));
  };

  const showcaseBoard = () => { //showcases the board after game is over 
    return board.map((cell, index) => (
      <button key={index} className="board-button">
        {cell}
      </button>
    ));
  };
  
    return (
      <div className="App">
        <div className="game-container">
          <div className="board-container">
          {playState ? renderBoard() : showcaseBoard()}
          </div>
          <div className="question-container">
          {playState ? (
          <>
            <h2>Question:</h2>
            <p>{question}</p>
            {isQuestionCorrect ? null : (
              <form onSubmit={handleAnswerSubmit}>
                <input type='text' name='answer'id='answerField' placeholder='Enter your answer' />   
                <button type="submit">Answer</button>
                <p>Current Player: {currentPlayer}</p>
              </form>
            )}
          </>
          ) : (
          <>
              <p> <h2>player {currentPlayer === 'X' ? 'O' : 'X'} has won</h2> </p>
              <button onClick={handleRestart}>restart</button>
          </>
          )}
          </div>
        </div>
      </div>
    );
};

export default App;