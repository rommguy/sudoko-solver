import { isNumber } from "lodash";
import BoardStyles from "./Board.module.css";
import { BoardType, CellType, RowType } from "../types";

interface BoardProps {
  board: BoardType;
  setBoard: (board: BoardType) => void;
}

const getCellClass = (
  rowIndex: number,
  columnIndex: number,
  cellType: CellType,
) => {
  return `${BoardStyles.cell} ${
    [2, 5, 8].includes(rowIndex) ? BoardStyles.boxBottom : ""
  } ${[2, 5, 8].includes(columnIndex) ? BoardStyles.boxRight : ""} ${
    columnIndex === 0 ? BoardStyles.boardStartLeft : ""
  } ${rowIndex === 0 ? BoardStyles.boardStartTop : ""}
  ${cellType === "user" ? BoardStyles.userCell : ""} ${
    cellType === "solution" ? BoardStyles.solutionCell : ""
  }`;
};
export const Board = ({ board, setBoard }: BoardProps) => {
  const handleChange = (
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => {
    const numberValue = Number(value);
    if (
      value === "" ||
      (isNumber(numberValue) && numberValue >= 1 && numberValue <= 9)
    ) {
      const newBoard = [...board];
      newBoard[rowIndex][columnIndex] = {
        value: numberValue,
        type: "user",
        rowIndex: rowIndex,
        colIndex: columnIndex,
      };
      setBoard(newBoard);
    }
  };

  return (
    <div className={BoardStyles.board}>
      {board.map((row: RowType, rowIndex: number) =>
        row.map((cell, columnIndex: number) => (
          <input
            key={`${rowIndex}-${columnIndex}`}
            type="text"
            className={getCellClass(rowIndex, columnIndex, cell.type)}
            value={board[rowIndex][columnIndex].value || ""}
            onChange={(e) =>
              handleChange(rowIndex, columnIndex, e.target.value)
            }
            maxLength={1}
          />
        )),
      )}
    </div>
  );
};
