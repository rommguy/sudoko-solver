import { BoardType, BoardWithOptions, Cell, CellWithOptions } from "../types";
import { some } from "lodash";

interface SolveArgs {
  rowIndex: number;
  colIndex: number;
  board: BoardWithOptions;
  value: number;
}

const getBoxCells = (
  rowIndex: number,
  columnIndex: number,
  board: BoardWithOptions,
): CellWithOptions[] => {
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
}: SolveArgs): boolean => {
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
}: SolveArgs): BoardWithOptions => {
  const rowCells = board[rowIndex];
  return fillValueInValidCell({ rowIndex, colIndex, board, value }, rowCells);
};

const fillValueInColumn = ({
  rowIndex,
  colIndex,
  board,
  value,
}: SolveArgs): BoardWithOptions => {
  const colCells = board.map((row) => row[colIndex]);
  return fillValueInValidCell({ rowIndex, colIndex, board, value }, colCells);
};

const fillValueInSquare = ({
  rowIndex,
  colIndex,
  board,
  value,
}: SolveArgs): BoardWithOptions => {
  const boxCells = getBoxCells(rowIndex, colIndex, board);
  return fillValueInValidCell({ rowIndex, colIndex, board, value }, boxCells);
};

const fillValueInValidCell = (
  { board, value }: SolveArgs,
  boxCells: CellWithOptions[],
): BoardWithOptions => {
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

    return { ...cell, value, type: "solution", options: [] } as CellWithOptions;
  });
  const updatedBoard = board.map((row, index) => {
    if (index !== solutionRow) {
      return row;
    }

    return updatedRow;
  });

  return updatedBoard;
};

export const solveSingleMove = (board: BoardWithOptions): BoardWithOptions => {
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

const addOptions = (board: BoardType): BoardWithOptions =>
  board.map((row) =>
    row.map((cell) => {
      if (cell.value !== null) {
        return { ...cell, options: [] };
      }
      const options = Array(10).fill(true);
      return { ...cell, options };
    }),
  );

export const solveBoard = (board: BoardType): BoardType => {
  let boardWithOptions = addOptions(board);

  let updatedBoard = solveSingleMove(boardWithOptions);
  while (updatedBoard !== boardWithOptions) {
    boardWithOptions = updatedBoard;
    updatedBoard = solveSingleMove(boardWithOptions);
  }

  return updatedBoard;
};
