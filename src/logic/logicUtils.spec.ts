import { parseBoardInput } from "../utils/parseUtils.ts";
import { solveBoard } from "./solution.ts";

describe("logicUtils", () => {
  describe("single option for value", () => {
    it("should add value", () => {
      const board = parseBoardInput(
        `
      1 2 3 5 - 9
      4 - 6 1 2 3
      8 9 7 - - -
      `,
        9,
      );

      const result = solveBoard(board);

      expect(result[0][4].value).toBe(7);

      const result2 = solveBoard(result);

      expect(result2[1][1].value).toBe(5);
    });
  });
});
