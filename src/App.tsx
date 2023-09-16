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

export const App = () => {
  const [board, setBoard] = useState<BoardType>(createInitialBoard());
  return (
    <div>
      <Board board={board} setBoard={setBoard} />
    </div>
  );
};
