import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    //Revisamos todas las posiciones ganadoras para ver si X u O gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] //X u O
      }
    }
    //Si no hay ganador retornar null
    return null
  }

  export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)

  }
