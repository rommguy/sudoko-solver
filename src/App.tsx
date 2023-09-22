import { useState } from "react";
import "./App.css";
import AppStyles from "./App.module.css";
import { Board } from "./components/Board";
import { BoardWithOptions } from "./types";
import { solveBoard } from "./logic/solution";
import { assignValue } from "./logic/solutionUtils.ts";
import { createDifficultBoard } from "./examples/exampleBoards";

export const App = () => {
  const [board, setBoard] = useState<BoardWithOptions>(createDifficultBoard());

  const onSolveClicked = () => {
    const solvedBoard = solveBoard(board);
    setBoard(solvedBoard);
  };

  const onEditCell = (value: number, rowIndex: number, colIndex: number) => {
    const updatedBoard = assignValue({ rowIndex, colIndex, value, board });
    setBoard(updatedBoard);
  };

  return (
    <div>
      <div className={AppStyles.title}>פתרון הסודוקו של משפחת רום</div>
      <Board board={board} setValue={onEditCell} />
      <div>
        <button onClick={onSolveClicked}>פתור</button>
      </div>
    </div>
  );
};
