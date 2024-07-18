import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";

//inicio de App
function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  //Null es que no hay ganador, false es que hay empate 
  const [winner, setWinner] = useState(null)

  const resetGame =  () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }


  const updateBoard = (index) => {
    //No actualizamos esta posición si ya tiene algo o hay un ganador
    if (board[index] || winner) return
    //Actualizamos el board(tablero)
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner) 
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }
 
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <h2><strong>Richi</strong></h2>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}> {TURNS.X} </Square>
        <Square isSelected={turn === TURNS.O}> {TURNS.O} </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  );
}

export default App;
