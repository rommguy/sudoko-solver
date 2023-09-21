import { useState } from "react";
import BoardStyles from "./Board.module.css";
import { BoardWithOptions, CellType, RowType } from "../types";

interface BoardProps {
  board: BoardWithOptions;
  setValue: (value: number, rowIndex: number, colIndex: number) => void;
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

export const Board = ({ board, setValue }: BoardProps) => {
  const [currentOptions, setCurrentOptions] = useState<boolean[]>([]);
  const handleChange = (
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => {
    const numberValue = Number(value);
    if (numberValue) {
      setValue(numberValue, rowIndex, columnIndex);
    }
  };

  return (
    <div>
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
              onMouseEnter={() => {
                setCurrentOptions(board[rowIndex][columnIndex].options);
              }}
              onMouseLeave={() => {
                setCurrentOptions([]);
              }}
            />
          )),
        )}
      </div>
      <div className={BoardStyles.optionsContainer}>
        {currentOptions.map((value, index) =>
          value && index > 0 ? (
            <span className={BoardStyles.option} key={index}>
              {index}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
};
