export type CellType = "initial" | "solution" | "user";

export type Cell = {
  value: number | null;
  type: CellType;
  rowIndex: number;
  colIndex: number;
};

export type RowType = Cell[];

export type BoardType = RowType[];

export type CellWithOptions = Cell & {
  options: boolean[];
};

export type RowWithOptions = CellWithOptions[];

export type BoardWithOptions = RowWithOptions[];
