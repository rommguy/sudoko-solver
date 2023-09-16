import { useState } from "react";
import "./App.css";
import AppStyles from "./App.module.css";
import { Board } from "./components/Board";
import { BoardWithOptions, RowWithOptions } from "./types";
import { solveBoard } from "./logic/solution";

const createInitialBoard2 = () => {
  const board: BoardWithOptions = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    const row: RowWithOptions = [];
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      row.push({
        value: null,
        type: "initial",
        rowIndex,
        colIndex,
        options: Array(10).fill(true),
      });
    }
    board.push(row);
  }

  board[0][1].value = 8;
  board[0][4].value = 7;
  board[0][5].value = 1;
  board[0][6].value = 2;
  board[1][0].value = 1;
  board[1][7].value = 7;
  board[1][8].value = 8;
  board[2][2].value = 2;
  board[2][5].value = 4;
  board[3][3].value = 3;
  board[3][5].value = 9;
  board[3][7].value = 5;
  board[4][2].value = 7;
  board[4][6].value = 9;
  board[5][1].value = 9;
  board[5][3].value = 7;
  board[5][5].value = 5;
  board[6][3].value = 6;
  board[6][6].value = 5;
  board[7][0].value = 4;
  board[7][1].value = 3;
  board[7][8].value = 1;
  board[8][2].value = 6;
  board[8][3].value = 4;
  board[8][4].value = 2;
  board[8][7].value = 9;

  return board;
};

const createInitialBoard3 = () => {
  const board: BoardWithOptions = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    const row: RowWithOptions = [];
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      row.push({
        value: null,
        type: "initial",
        rowIndex,
        colIndex,
        options: Array(10).fill(true),
      });
    }
    board.push(row);
  }

  board[0][6].value = 3;
  board[0][7].value = 6;
  board[0][8].value = 8;

  board[1][2].value = 3;
  board[1][3].value = 5;
  board[1][4].value = 4;
  board[1][6].value = 7;
  board[1][8].value = 2;

  board[2][4].value = 9;
  board[2][8].value = 1;

  board[3][1].value = 8;
  board[3][2].value = 6;
  board[3][5].value = 7;

  board[5][3].value = 3;
  board[5][6].value = 1;
  board[5][7].value = 4;

  board[6][0].value = 9;
  board[6][4].value = 3;

  board[7][0].value = 7;
  board[7][2].value = 2;
  board[7][4].value = 1;
  board[7][5].value = 5;
  board[7][6].value = 6;

  board[8][0].value = 8;
  board[8][1].value = 3;
  board[8][2].value = 1;

  return board;
};

export const App = () => {
  const [board, setBoard] = useState<BoardWithOptions>(createInitialBoard3());

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
