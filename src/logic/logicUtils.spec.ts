import { canFill } from "./logicUtils";
import { BoardType, RowType } from "../types";

const createInitialBoard = (): BoardType => {
  // creates a 9x9 board with all cells null
  const board: BoardType = [];
  for (let i = 0; i < 9; i++) {
    const row: RowType = [];
    for (let j = 0; j < 9; j++) {
      row.push({ value: null, type: "initial", rowIndex: i, colIndex: j });
    }
    board.push(row);
  }
  return board;
};

describe("logicUtils", () => {
  describe("canFill", () => {
    it("should return true if the value is not present in the square", () => {
      const board = createInitialBoard();
      board[0][1].value = 1;
      board[0][2].value = 2;
      board[1][1].value = 3;
      board[1][2].value = 4;

      const resultTrue = canFill({
        rowIndex: 0,
        colIndex: 0,
        board,
        value: 6,
      });
      const resultFalse = canFill({
        rowIndex: 0,
        colIndex: 0,
        board,
        value: 4,
      });

      expect(resultFalse).toBe(false);

      expect(resultTrue).toBe(true);
    });
    it("should return true if the value is not present in the row", () => {
      const board = createInitialBoard();

      board[0][7].value = 6;

      const resultFalse = canFill({
        rowIndex: 0,
        colIndex: 0,
        board,
        value: 6,
      });

      const resultTrue = canFill({
        rowIndex: 0,
        colIndex: 0,
        board,
        value: 8,
      });
      expect(resultFalse).toBe(false);
      expect(resultTrue).toBe(true);
    });

    it("should return true if the value is not present in the column", () => {
      const board = createInitialBoard();
      board[7][0].value = 6;

      const resultFalse = canFill({
        rowIndex: 0,
        colIndex: 0,
        board,
        value: 6,
      });

      const resultTrue = canFill({
        rowIndex: 0,
        colIndex: 0,
        board,
        value: 8,
      });
      expect(resultFalse).toBe(false);
      expect(resultTrue).toBe(true);
    });

    it("should return false if the cell is already filled", async () => {
      const board = createInitialBoard();
      board[1][0].value = 6;
      const resultFalse = canFill({
        rowIndex: 1,
        colIndex: 0,
        board,
        value: 5,
      });
      expect(resultFalse).toEqual(false);
    });
  });

  describe("fillValue", () => {});
});
