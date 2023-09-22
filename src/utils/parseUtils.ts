import { isNumber, isNaN, trim } from "lodash";
import { BoardWithOptions, CellWithOptions } from "../types";
import { addOptions } from "../logic/solutionUtils.ts";

export const createOptions = (options: number[]) =>
  Array(10)
    .fill(true)
    .map((_, index) => (options.includes(index) ? true : false));

const emptyCell: CellWithOptions = {
  value: null,
  type: "initial",
  rowIndex: -1,
  colIndex: -1,
  options: Array(10).fill(true),
};

const createEmptyRow = (rowIndex: number, boardSize: number) =>
  new Array(boardSize).fill(emptyCell).map((cell, colIndex) => ({
    ...cell,
    rowIndex,
    colIndex,
  }));

const parseInputLine = (
  inputLine: string,
  rowIndex: number,
  boardSize: number,
): CellWithOptions[] => {
  const inputLineArray = inputLine.split(" ");
  return new Array(boardSize).fill("").map((_, colIndex) => ({
    value:
      isNumber(parseInt(inputLineArray[colIndex], 10)) &&
      !isNaN(parseInt(inputLineArray[colIndex], 10))
        ? parseInt(inputLineArray[colIndex], 10)
        : null,
    type: "initial",
    rowIndex,
    colIndex,
    options: Array(10).fill(true),
  }));
};

export const parseBoardInput = (
  boardInput: string,
  boardSize: number,
): BoardWithOptions => {
  const [, ...boardLines] = boardInput.split("\n").map(trim);
  const board = new Array(boardSize).fill("").map((_, rowIndex) => {
    return boardLines[rowIndex]
      ? parseInputLine(boardLines[rowIndex], rowIndex, boardSize)
      : createEmptyRow(rowIndex, boardSize);
  });

  return addOptions(board);
};
