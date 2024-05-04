import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null)); // game board changes  (X, O)
  const [currentPlayer, setCurrentPlayer] = useState('X'); //sets the current player changes (X,O)
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false); //sets if the question was corect (true, false)
  const [question, setQuestion] = useState(''); //used to store question (any string from Questions)
  const [answer, setAnswer] = useState(''); //used to store ansers (any string from Questions)
  const [incorect, setIncorect] = useState(0); //stores the amount of inocrect absers (int)
  const [playState, setplay] = useState(true); // true means that the game is playing. false means the game is over (true, false)

  const Questions = [ //stores questions and ansers 
    { question: 'What is the term for a program disguised as legitimate software but with malicious intent?', answer: 'trojan horse' },
    { question: 'What is the brain of a computer?', answer: 'CPU' },
    { question: 'What component primarily displays images and video?', answer: 'monitor' },
    { question: 'What device is used for text and command input?', answer: 'keyboard' },
    { question: 'What common device controls a cursor on screen?', answer: 'mouse' },
    { question: 'What stores data even when the computer is off?', answer: 'hard drive' },
    { question: 'What is the core software that manages a computer?', answer: 'operating system' },
    { question: 'What kind of software lets you view websites?', answer: 'browser' },
    { question: 'What do you call software designed to cause harm?', answer: 'malware' },
    { question: 'What kind of software helps organize numbers and data?', answer: 'spreadsheet' },
    { question: 'What are the instructions that tell a computer what to do?', answer: 'code' },
    { question: 'What is the process of finding and fixing errors in code?', answer: 'debugging' },
    { question: 'What do you call temporary values stored by a program?', answer: 'variables' },
    { question: 'What symbol often starts a single-line comment in code?', answer: '//' },
    { question: 'What is a block of code designed to be reused?', answer: 'function' },
    { question: 'What does AI stand for?', answer: 'artificial intelligence' },
    { question: 'What is the term for storing data remotely on internet servers?', answer: 'cloud' },
  ];

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

      checkWinner(newBoard); //checks for winner

      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); //cycles player

      // Update question and answer for next turn
      const randomIndex = Math.floor(Math.random() * Questions.length);
      const selectedQuestion = Questions[randomIndex];
      setQuestion(selectedQuestion.question);
      setAnswer(selectedQuestion.answer.toLowerCase());
      setIsQuestionCorrect(false); // Reset question state after each turn




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

    for (let i = 0; i < winningLines.length; i++) {//checking each winning line 
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
      setIncorect(0)
    } else {
      if (incorect >= 1) {
        const randomIndex = Math.floor(Math.random() * Questions.length);
        const selectedQuestion = Questions[randomIndex];
        setQuestion(selectedQuestion.question);
        setAnswer(selectedQuestion.answer.toLowerCase());
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        document.getElementById("answerField").value = "";
        setIncorect(0);
        alert('Incorrect answer! ' + currentPlayer + 's turn is over. question change');
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        document.getElementById("answerField").value = "";
        setIncorect(incorect + 1);
        let player = currentPlayer;
        alert('Incorrect answer! ' + player + 's turn is over');
      }
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
                  <input type='text' name='answer' id='answerField' placeholder='Enter your answer' />
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