import { parseBoardInput, createOptions } from "./parseUtils";

describe("board parser", () => {
  it("should parse board", async () => {
    const input = `
        1 2 3 5 - 9
        4 5 8 1 2 -
        `;

    const result = parseBoardInput(input, 9);

    expect(result[0][0]).toBeTruthy();
    expect(result[0][0]?.rowIndex).toBe(0);
    expect(result[0][0]?.colIndex).toBe(0);
    expect(result[0][0]?.value).toBe(1);
    expect(result[0][0]?.type).toBe("initial");
    expect(result[0][0]?.options).toEqual([]);

    expect(result[0][4]?.value).toBe(null);
    expect(result[0][4]?.options).toEqual(createOptions([4, 6, 7, 8]));
  });
});
