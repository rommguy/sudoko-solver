export type CellType = "initial" | "solution" | "user";

export type Cell = {
  value: number | null;
  type: CellType;
  rowIndex: number;
  colIndex: number;
};
export type RowType = Cell[];

export type BoardType = Array<RowType>;
