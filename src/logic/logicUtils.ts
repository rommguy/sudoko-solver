import { BoardType, Cell } from "../types";
import { some } from "lodash";

interface OptionArgs {
  rowIndex: number;
  colIndex: number;
  board: BoardType;
  value: number;
}

const getBoxCells = (
  rowIndex: number,
  columnIndex: number,
  board: BoardType,
): Cell[] => {
  const boxRowStart = Math.floor(rowIndex / 3) * 3;
  const boxColumnStart = Math.floor(columnIndex / 3) * 3;
  return [
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
};

export const canFill = ({
  rowIndex,
  colIndex,
  board,
  value,
}: OptionArgs): boolean => {
  if (board[rowIndex][colIndex].value !== null) {
    return false;
  }
  const boxCells = getBoxCells(rowIndex, colIndex, board);
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

const fillValueInRow = ({
  rowIndex,
  colIndex,
  board,
  value,
}: OptionArgs): BoardType => {
  const rowCells = board[rowIndex];
  return fillValueInValidCell({ rowIndex, colIndex, board, value }, rowCells);
};

const fillValueInColumn = ({
  rowIndex,
  colIndex,
  board,
  value,
}: OptionArgs): BoardType => {
  const colCells = board.map((row) => row[colIndex]);
  return fillValueInValidCell({ rowIndex, colIndex, board, value }, colCells);
};

const fillValueInSquare = ({
  rowIndex,
  colIndex,
  board,
  value,
}: OptionArgs): BoardType => {
  const boxCells = getBoxCells(rowIndex, colIndex, board);
  return fillValueInValidCell({ rowIndex, colIndex, board, value }, boxCells);
};

const fillValueInValidCell = (
  { board, value }: OptionArgs,
  boxCells: Cell[],
) => {
  const validCells = boxCells.filter((cell: Cell) =>
    canFill({ board, value, rowIndex: cell.rowIndex, colIndex: cell.colIndex }),
  );

  if (validCells.length === 0 || validCells.length > 1) {
    return board;
  }

  const solutionRow = validCells[0].rowIndex;
  const solutionCol = validCells[0].colIndex;

  const updatedRow = board[solutionRow].map((cell, index) => {
    if (index !== solutionCol) {
      return cell;
    }

    return { ...cell, value, type: "solution" } as Cell;
  });
  const updatedBoard = board.map((row, index) => {
    if (index !== solutionRow) {
      return row;
    }

    return updatedRow;
  });

  return updatedBoard;
};

export const solveBoard = (board: BoardType): BoardType => {
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cell = board[rowIndex][colIndex];
      if (cell.value !== null) {
        continue;
      }

      for (let value = 1; value <= 9; value++) {
        const updatedBoard = fillValueInSquare({
          rowIndex,
          colIndex,
          board,
          value,
        });
        if (updatedBoard !== board) {
          return updatedBoard;
        }
        const updatedBoardRow = fillValueInRow({
          rowIndex,
          colIndex,
          board,
          value,
        });
        if (updatedBoardRow !== board) {
          return updatedBoardRow;
        }
        const updatedBoardCol = fillValueInColumn({
          rowIndex,
          colIndex,
          board,
          value,
        });
        if (updatedBoardCol !== board) {
          return updatedBoardCol;
        }
      }
    }
  }
  return board;
};
