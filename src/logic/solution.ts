import { BoardType, BoardWithOptions } from "../types";
import { applyOptions, getBoxCells, solveSingleMove } from "./logicUtils";

const addOptions = (board: BoardType): BoardWithOptions =>
  board.map((row) =>
    row.map((cell) => {
      if (cell.value !== null) {
        return { ...cell, options: [] };
      }

      const column = board.map((row) => row[cell.colIndex]);
      const box = getBoxCells(cell.rowIndex, cell.colIndex, board);
      const valuesFromNeighbors = [
        ...row.filter((cell) => cell.value !== null),
        ...column.filter((cell) => cell.value !== null),
        ...box.filter((cell) => cell.value !== null),
      ].map((cell) => cell.value);
      const options = Array(10)
        .fill(true)
        .map((_, index) => {
          if (index === 0) {
            return false;
          }
          return !valuesFromNeighbors.includes(index);
        });
      return { ...cell, options };
    }),
  );

export const solveBoard = (board: BoardType): BoardWithOptions => {
  const boardWithOptions = addOptions(board);

  const updatedBoard = solveSingleMove(boardWithOptions);
  if (updatedBoard !== boardWithOptions) {
    return applyOptions(updatedBoard);
  }
  // while (updatedBoard !== boardWithOptions) {
  //   boardWithOptions = updatedBoard;
  //   updatedBoard = solveSingleMove(boardWithOptions);
  // }

  return solveSingleMove(applyOptions(updatedBoard));
};
