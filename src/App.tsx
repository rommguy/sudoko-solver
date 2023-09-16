import { useState } from "react";
import "./App.css";
import AppStyles from "./App.module.css";
import { Board } from "./components/Board";
import { BoardType, RowType } from "./types";
import { solveBoard } from "./logic/logicUtils";

const createInitialBoard2 = () => {
  const board: BoardType = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    const row: RowType = [];
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      row.push({ value: null, type: "initial", rowIndex, colIndex });
    }
    board.push(row);
  }

  board[0][1].value = 2;
  board[0][7].value = 1;
  board[1][2].value = 3;
  board[1][3].value = 1;
  board[1][5].value = 2;
  board[1][6].value = 4;
  board[2][2].value = 5;
  board[2][4].value = 9;
  board[3][0].value = 5;
  board[3][7].value = 8;
  board[3][8].value = 3;
  board[4][3].value = 2;
  board[4][4].value = 7;
  board[4][5].value = 6;
  board[5][0].value = 9;
  board[5][1].value = 4;
  board[5][8].value = 7;
  board[6][4].value = 6;
  board[6][6].value = 7;
  board[7][2].value = 1;
  board[7][3].value = 7;
  board[7][5].value = 4;
  board[7][6].value = 2;
  board[8][1].value = 9;
  board[8][7].value = 3;

  return board;
};

export const App = () => {
  const [board, setBoard] = useState<BoardType>(createInitialBoard2());

  const onSolveClicked = () => {
    const solvedBoard = solveBoard(board);
    setBoard(solvedBoard);
  };

  return (
    <div>
      <div className={AppStyles.title}>פתרון הסודוקו של משפחת רום</div>
      <Board board={board} setBoard={setBoard} />
      <div>
        <button onClick={onSolveClicked}>פתור</button>
      </div>
    </div>
  );
};
