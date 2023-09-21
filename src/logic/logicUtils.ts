import {
  BoardType,
  BoardWithOptions,
  Cell,
  CellWithOptions,
  RowWithOptions,
} from "../types";
import { some, first, last } from "lodash";
import { logInfo } from "../utils/logUtils";

interface SolveArgs {
  rowIndex: number;
  colIndex: number;
  board: BoardWithOptions;
  value: number;
}

export const getBoxCells = <T extends BoardType>(
  rowIndex: number,
  columnIndex: number,
  board: T,
): T[number] => {
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

export const assignValue = ({
  rowIndex,
  colIndex,
  board,
  value,
}: SolveArgs): BoardWithOptions => {
  const solutionBoxCells = getBoxCells(rowIndex, colIndex, board);
  return board.map((row, currentRowIndex): RowWithOptions => {
    return row.map((cell, currentColIndex): CellWithOptions => {
      if (currentRowIndex === rowIndex && currentColIndex === colIndex) {
        return {
          ...cell,
          value,
          type: "solution",
          options: [],
        } as CellWithOptions;
      }
      if (
        currentColIndex === colIndex ||
        currentRowIndex === rowIndex ||
        solutionBoxCells.includes(cell)
      ) {
        return {
          ...cell,
          options: cell.options.map((option, index) =>
            index === value ? false : option,
          ),
        } as CellWithOptions;
      }
      return cell;
    });
  });
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

  return assignValue({
    board,
    value,
    colIndex: solutionCol,
    rowIndex: solutionRow,
  });
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

      const allowedOptions = cell.options.filter((option) => option);
      if (allowedOptions.length === 1) {
        const value = cell.options.indexOf(true);
        return assignValue({
          board,
          value,
          colIndex,
          rowIndex,
        });
      }
    }
  }

  return board;
};

const removeOption = (
  board: BoardWithOptions,
  cells: CellWithOptions[],
  optionToRemove: number,
): BoardWithOptions => {
  if (!cells.length) {
    return board;
  }
  return board.map((row) => {
    return row.map((cell) => {
      if (cells.includes(cell)) {
        return {
          ...cell,
          options: cell.options.map((option, index) =>
            index === optionToRemove ? false : option,
          ),
        };
      }
      return cell;
    });
  });
};

export const applyOptions = (board: BoardWithOptions): BoardWithOptions => {
  logInfo("Applying options");
  let updatedBoard = board;
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    const row = board[rowIndex];
    for (let value = 1; value <= 9; value++) {
      const valueOptions = row.filter((cell) => cell.options[value]);
      // if all value options are in the same box, remove the value from the rest of the box
      if (
        valueOptions.length > 1 &&
        valueOptions.length <= 3 &&
        Math.floor(first(valueOptions)!.colIndex / 3) ===
          Math.floor(last(valueOptions)!.colIndex / 3)
      ) {
        logInfo(
          `Found ${valueOptions.length} options for ${value} in row ${rowIndex} at the same box`,
        );
        const boxCellsInOtherRows = getBoxCells(
          valueOptions[0].rowIndex,
          valueOptions[0].colIndex,
          updatedBoard,
        ).filter((cell) => cell.rowIndex !== rowIndex);
        updatedBoard = removeOption(updatedBoard, boxCellsInOtherRows, value);
      }
    }
  }

  for (let colIndex = 0; colIndex < 9; colIndex++) {
    const column = board.map((row) => row[colIndex]);
    for (let value = 1; value <= 9; value++) {
      const valueOptions = column.filter((cell) => cell.options[value]);

      if (
        valueOptions.length > 1 &&
        valueOptions.length <= 3 &&
        Math.floor(first(valueOptions)!.rowIndex / 3) ===
          Math.floor(last(valueOptions)!.rowIndex / 3)
      ) {
        logInfo(
          `Found ${valueOptions.length} options for ${value} in column ${colIndex} at the same box`,
        );
        const boxCellsInOtherColumns = getBoxCells(
          valueOptions[0].rowIndex,
          valueOptions[0].colIndex,
          board,
        ).filter((cell) => cell.colIndex !== colIndex);
        updatedBoard = removeOption(
          updatedBoard,
          boxCellsInOtherColumns,
          value,
        );
      }
    }
  }

  // go over all boxes
  for (let rowIndex = 0; rowIndex < 9; rowIndex += 3) {
    for (let columnIndex = 0; columnIndex < 9; columnIndex += 3) {
      const boxCells = getBoxCells(rowIndex, columnIndex, board);
      for (let value = 1; value <= 9; value++) {
        const valueOptions = boxCells.filter((cell) => cell.options[value]);
        if (valueOptions.length > 1 && valueOptions.length <= 3) {
          if (first(valueOptions)!.rowIndex === last(valueOptions)!.rowIndex) {
            logInfo(
              `found ${valueOptions.length} options for ${value} in the same row in box ${rowIndex}-${columnIndex}`,
            );
            const rowCellsInOtherBoxes = board[
              first(valueOptions)!.rowIndex
            ].filter((cell) => !boxCells.includes(cell));
            updatedBoard = removeOption(
              updatedBoard,
              rowCellsInOtherBoxes,
              value,
            );
          } else if (
            first(valueOptions)!.colIndex === last(valueOptions)!.colIndex
          ) {
            const colCellsInOtherBoxes = board
              .map((row) => row[first(valueOptions)!.colIndex])
              .filter((cell) => !boxCells.includes(cell));
            updatedBoard = removeOption(
              updatedBoard,
              colCellsInOtherBoxes,
              value,
            );
          }
        }
      }
    }
  }

  return updatedBoard;
};

export const addOptions = (board: BoardType): BoardWithOptions =>
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
