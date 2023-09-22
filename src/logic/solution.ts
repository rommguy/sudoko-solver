import { BoardType, BoardWithOptions } from "../types";
import { addOptions, applyOptions, solveSingleMove } from "./solutionUtils.ts";

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
