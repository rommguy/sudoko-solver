import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { BoardType } from "./types";

const createInitialBoard = () => {
  // creates a 9x9 board with all cells null
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
};

const createInitialBoard2 = () => {
  const board: BoardType = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(null);
    }
    board.push(row);
  }

  board[0][1] = 2;
  board[0][7] = 1;

  board[1][2] = 3;
  board[1][3] = 1;
  board[1][5] = 2;
  board[1][6] = 4;

  board[2][2] = 5;
  board[2][4] = 9;

  board[3][0] = 5;
  board[3][7] = 8;
  board[3][8] = 3;

  board[4][3] = 2;
  board[4][4] = 7;
  board[4][5] = 6;

  board[5][0] = 9;
  board[5][1] = 4;
  board[5][8] = 7;

  board[6][4] = 6;
  board[6][6] = 7;

  board[7][2] = 1;
  board[7][3] = 7;
  board[7][5] = 4;
  board[7][6] = 2;

  board[8][1] = 9;
  board[8][7] = 3;

  return board;
};

export const App = () => {
  const [board, setBoard] = useState<BoardType>(createInitialBoard2());
  return (
    <div>
      <Board board={board} setBoard={setBoard} />
    </div>
  );
};
