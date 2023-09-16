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

  return !some(boxCells, (boxCell: Cell) => boxCell.value === value);
};
