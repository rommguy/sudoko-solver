import { BoardType, Cell } from "../types";
import { some } from "lodash";

export const canFill = ({
  rowIndex,
  colIndex,
  board,
  value,
}: {
  rowIndex: number;
  colIndex: number;
  board: BoardType;
  value: number;
}): boolean => {
  const boxRowStart = Math.floor(rowIndex / 3) * 3;
  const boxColumnStart = Math.floor(colIndex / 3) * 3;
  const boxCells = [
    board[boxRowStart][boxColumnStart],
    board[boxRowStart][boxColumnStart + 1],
    board[boxRowStart][boxColumnStart + 2],
    board[boxRowStart + 1][boxColumnStart],
    board[boxRowStart + 1][boxColumnStart + 1],
    board[boxRowStart + 1][boxColumnStart + 2],
    board[boxRowStart + 2][boxColumnStart],
    board[boxRowStart + 2][boxColumnStart + 1],
    board[boxRowStart + 2][boxColumnStart + 2],
  ];
  const rowCells = board[rowIndex];
  const columnCells = board.map((row) => row[colIndex]);

  const inBox = some(boxCells, (boxCell: Cell) => boxCell.value === value);
  const inRow = some(rowCells, (rowCell: Cell) => rowCell.value === value);
  const inColumn = some(
    columnCells,
    (columnCell: Cell) => columnCell.value === value,
  );

  return !inBox && !inRow && !inColumn;
};

export const solveBoard = (board: BoardType): BoardType => {
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cell = board[rowIndex][colIndex];
      if (cell.value !== null) {
        continue;
      }

      for (let value = 1; value <= 9; value++) {
        if (!canFill({ rowIndex, colIndex, board, value })) {
          continue;
        }

        const updatedRow = board[rowIndex].map((cell, index) => {
          if (index !== colIndex) {
            return cell;
          }

          return { value, type: "solution" } as Cell;
        });
        const updatedBoard = board.map((row, index) => {
          if (index !== rowIndex) {
            return row;
          }

          return updatedRow;
        });

        return updatedBoard;
      }
    }
  }
  return board;
};
