export type CellType = "initial" | "solution" | "user";

export type Cell = {
  value: number | null;
  type: CellType;
};
export type RowType = Cell[];

export type BoardType = Array<RowType>;
